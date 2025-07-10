package com.ecommerce.model;

import lombok.Data;
import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    private String imageUrl;
    
    @Column(nullable = false)
    private Integer stockQuantity;
    
    @Column(nullable = false)
    private String category;
    
    private Boolean isAvailable = true;
    
    @Column(name = "stripe_product_id")
    private String stripeProductId;
    
    @Column(name = "stripe_price_id")
    private String stripePriceId;
}