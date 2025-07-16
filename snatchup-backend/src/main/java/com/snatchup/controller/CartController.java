package com.snatchup.controller;

import com.snatchup.model.CartItem;
import com.snatchup.service.CartService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItem> getCartItems(@AuthenticationPrincipal UserDetails userDetails) {
        return cartService.getCartItems(userDetails.getUsername());
    }

    @PostMapping
    public CartItem addToCart(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        int quantity = Integer.parseInt(payload.get("quantity").toString());
        return cartService.addToCart(userDetails.getUsername(), productId, quantity);
    }

    @DeleteMapping("/{cartItemId}")
    public void removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
    }
} 