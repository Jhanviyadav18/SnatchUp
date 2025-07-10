package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product.ProductBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    public Product createProduct(Product product) {
        try {
            Stripe.apiKey = stripeApiKey;

            // Create Stripe product
            Map<String, Object> productParams = new HashMap<>();
            productParams.put("name", product.getName());
            productParams.put("description", product.getDescription());
            com.stripe.model.Product stripeProduct = com.stripe.model.Product.create(productParams);

            // Create Stripe price
            Map<String, Object> priceParams = new HashMap<>();
            priceParams.put("unit_amount", product.getPrice().multiply(new java.math.BigDecimal(100)).longValue());
            priceParams.put("currency", "usd");
            priceParams.put("product", stripeProduct.getId());
            Price stripePrice = Price.create(priceParams);

            // Set Stripe IDs
            product.setStripeProductId(stripeProduct.getId());
            product.setStripePriceId(stripePrice.getId());

            return productRepository.save(product);
        } catch (StripeException e) {
            throw new RuntimeException("Error creating product in Stripe", e);
        }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getAvailableProducts() {
        return productRepository.findByIsAvailableTrue();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setCategory(productDetails.getCategory());
        product.setIsAvailable(productDetails.getIsAvailable());

        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        try {
            Stripe.apiKey = stripeApiKey;
            if (product.getStripeProductId() != null) {
                com.stripe.model.Product.retrieve(product.getStripeProductId()).delete();
            }
            productRepository.delete(product);
        } catch (StripeException e) {
            throw new RuntimeException("Error deleting product from Stripe", e);
        }
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Transactional
    public void updateStock(Long productId, Integer quantity) {
        Product product = getProductById(productId);
        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);
    }

    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }
}