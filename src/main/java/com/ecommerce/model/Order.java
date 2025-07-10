package com.ecommerce.model;

import lombok.Data;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    @Column(nullable = false)
    private LocalDateTime orderDate = LocalDateTime.now();
    
    @Column(nullable = false)
    private BigDecimal totalAmount;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;
    
    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;
    
    @Column
    private String shippingAddress;
    
    @Column
    private String paymentMethod;
    
    public enum OrderStatus {
        PENDING,
        PAID,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }
}