package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCategory(String category);
    
    List<Product> findByIsAvailableTrue();
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1% OR p.description LIKE %?1%")
    List<Product> searchProducts(String keyword);
    
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
    @Query("SELECT p FROM Product p WHERE p.stockQuantity < 10 AND p.isAvailable = true")
    List<Product> findLowStockProducts();
    
    List<Product> findByCategoryAndIsAvailableTrue(String category);
}