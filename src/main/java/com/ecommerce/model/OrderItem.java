package com.ecommerce.model;

import lombok.Data;
import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "order_items")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private BigDecimal priceAtPurchase;
    
    @Column(nullable = false)
    private BigDecimal subtotal;
    
    @PrePersist
    @PreUpdate
    private void calculateSubtotal() {
        if (quantity != null && priceAtPurchase != null) {
            subtotal = priceAtPurchase.multiply(BigDecimal.valueOf(quantity));
        }
    }
}