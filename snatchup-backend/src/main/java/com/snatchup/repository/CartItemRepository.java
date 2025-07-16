package com.snatchup.repository;

import com.snatchup.model.CartItem;
import com.snatchup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
} 