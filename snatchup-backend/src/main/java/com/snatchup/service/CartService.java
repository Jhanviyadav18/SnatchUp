package com.snatchup.service;

import com.snatchup.model.CartItem;
import com.snatchup.model.Product;
import com.snatchup.model.User;
import com.snatchup.repository.CartItemRepository;
import com.snatchup.repository.ProductRepository;
import com.snatchup.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<CartItem> getCartItems(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(String username, Long productId, int quantity) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
    
        CartItem item = CartItem.builder()
                .product(product)
                .quantity(quantity)
                .user(user)
                .build();
    
        return cartItemRepository.save(item);
    }
    
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
}
