package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.model.User;
import com.ecommerce.service.OrderService;
import com.ecommerce.service.UserService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @Valid @RequestBody Map<String, Object> orderRequest,
            Authentication authentication) {
        
        User user = userService.getUserByEmail(authentication.getName());
        List<OrderItem> items = (List<OrderItem>) orderRequest.get("items");
        String shippingAddress = (String) orderRequest.get("shippingAddress");

        Order order = orderService.createOrder(user, items, shippingAddress);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/process-payment")
    public ResponseEntity<Order> processPayment(@RequestParam String paymentIntentId) {
        Order order = orderService.processPayment(paymentIntentId);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(
            @PathVariable Long id,
            Authentication authentication) {
        
        Order order = orderService.getOrderById(id);
        User user = userService.getUserByEmail(authentication.getName());

        // Ensure user can only access their own orders unless they're an admin
        if (!order.getUser().getId().equals(user.getId()) &&
            !user.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.forbidden().build();
        }

        return ResponseEntity.ok(order);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> getUserOrders(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        List<Order> orders = orderService.getUserOrders(user);
        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam Order.OrderStatus status) {
        Order updatedOrder = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Long id,
            Authentication authentication) {
        
        User user = userService.getUserByEmail(authentication.getName());
        Order order = orderService.getOrderById(id);

        // Verify user owns the order or is admin
        if (!order.getUser().getId().equals(user.getId()) &&
            !user.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.forbidden().build();
        }

        Order cancelledOrder = orderService.cancelOrder(id);
        return ResponseEntity.ok(cancelledOrder);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<Order>> getRecentOrders(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime since) {
        List<Order> orders = orderService.getRecentOrders(since);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/revenue")
    public ResponseEntity<Double> getRevenue(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        Double revenue = orderService.calculateRevenue(startDate, endDate);
        return ResponseEntity.ok(revenue);
    }
}