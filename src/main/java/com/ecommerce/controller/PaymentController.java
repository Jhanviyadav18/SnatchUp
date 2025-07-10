package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.ecommerce.service.OrderService;
import com.ecommerce.service.PaymentService;
import com.ecommerce.service.UserService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final OrderService orderService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService,
                           OrderService orderService,
                           UserService userService) {
        this.paymentService = paymentService;
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(
            @RequestParam Long orderId,
            Authentication authentication) {
        try {
            User user = userService.getUserByEmail(authentication.getName());
            Order order = orderService.getOrderById(orderId);

            // Verify user owns the order
            if (!order.getUser().getId().equals(user.getId())) {
                return ResponseEntity.forbidden().build();
            }

            PaymentIntent paymentIntent = paymentService.createPaymentIntent(order, user);

            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", paymentIntent.getClientSecret());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(
            @RequestParam String paymentIntentId,
            Authentication authentication) {
        try {
            PaymentIntent paymentIntent = paymentService.retrievePaymentIntent(paymentIntentId);
            Order order = orderService.getOrderById(Long.parseLong(paymentIntent.getMetadata().get("order_id")));
            User user = userService.getUserByEmail(authentication.getName());

            // Verify user owns the order
            if (!order.getUser().getId().equals(user.getId())) {
                return ResponseEntity.forbidden().build();
            }

            paymentIntent = paymentService.confirmPayment(paymentIntentId);
            
            if ("succeeded".equals(paymentIntent.getStatus())) {
                order = orderService.processPayment(paymentIntentId);
                return ResponseEntity.ok(order);
            } else {
                return ResponseEntity.badRequest().body("Payment failed");
            }
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error processing payment: " + e.getMessage());
        }
    }

    @PostMapping("/cancel-payment")
    public ResponseEntity<?> cancelPayment(
            @RequestParam String paymentIntentId,
            Authentication authentication) {
        try {
            PaymentIntent paymentIntent = paymentService.retrievePaymentIntent(paymentIntentId);
            Order order = orderService.getOrderById(Long.parseLong(paymentIntent.getMetadata().get("order_id")));
            User user = userService.getUserByEmail(authentication.getName());

            // Verify user owns the order
            if (!order.getUser().getId().equals(user.getId())) {
                return ResponseEntity.forbidden().build();
            }

            paymentIntent = paymentService.cancelPaymentIntent(paymentIntentId);
            order = orderService.cancelOrder(order.getId());

            return ResponseEntity.ok(order);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error cancelling payment: " + e.getMessage());
        }
    }

    @GetMapping("/payment-status")
    public ResponseEntity<?> getPaymentStatus(
            @RequestParam String paymentIntentId,
            Authentication authentication) {
        try {
            PaymentIntent paymentIntent = paymentService.retrievePaymentIntent(paymentIntentId);
            Order order = orderService.getOrderById(Long.parseLong(paymentIntent.getMetadata().get("order_id")));
            User user = userService.getUserByEmail(authentication.getName());

            // Verify user owns the order
            if (!order.getUser().getId().equals(user.getId())) {
                return ResponseEntity.forbidden().build();
            }

            Map<String, String> response = new HashMap<>();
            response.put("status", paymentIntent.getStatus());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error retrieving payment status: " + e.getMessage());
        }
    }
}