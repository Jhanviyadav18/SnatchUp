package com.ecommerce.service;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    private final UserService userService;

    public PaymentService(UserService userService) {
        this.userService = userService;
    }

    public PaymentIntent createPaymentIntent(Order order, User user) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        // Ensure user has a Stripe customer ID
        String stripeCustomerId = getOrCreateStripeCustomer(user);

        Map<String, Object> params = new HashMap<>();
        params.put("amount", order.getTotalAmount().multiply(new java.math.BigDecimal(100)).longValue());
        params.put("currency", "usd");
        params.put("customer", stripeCustomerId);
        params.put("payment_method_types", java.util.Arrays.asList("card"));
        params.put("description", "Order #" + order.getId());

        Map<String, String> metadata = new HashMap<>();
        metadata.put("order_id", order.getId().toString());
        metadata.put("user_id", user.getId().toString());
        params.put("metadata", metadata);

        return PaymentIntent.create(params);
    }

    private String getOrCreateStripeCustomer(User user) throws StripeException {
        if (user.getStripeCustomerId() != null) {
            return user.getStripeCustomerId();
        }

        Map<String, Object> customerParams = new HashMap<>();
        customerParams.put("email", user.getEmail());
        customerParams.put("name", user.getFirstName() + " " + user.getLastName());
        
        if (user.getPhone() != null) {
            customerParams.put("phone", user.getPhone());
        }

        Customer stripeCustomer = Customer.create(customerParams);
        user.setStripeCustomerId(stripeCustomer.getId());
        userService.updateUser(user);

        return stripeCustomer.getId();
    }

    public PaymentIntent confirmPayment(String paymentIntentId) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method", "pm_card_visa"); // For testing purposes
        return paymentIntent.confirm(params);
    }

    public PaymentIntent retrievePaymentIntent(String paymentIntentId) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        return PaymentIntent.retrieve(paymentIntentId);
    }

    public PaymentIntent cancelPaymentIntent(String paymentIntentId) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent.cancel();
    }
}