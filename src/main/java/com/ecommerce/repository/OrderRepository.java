package com.ecommerce.repository;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUser(User user);
    
    List<Order> findByUserOrderByOrderDateDesc(User user);
    
    List<Order> findByStatus(Order.OrderStatus status);
    
    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN ?1 AND ?2")
    List<Order> findOrdersInDateRange(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Order> findByStripePaymentIntentId(String paymentIntentId);
    
    @Query("SELECT o FROM Order o WHERE o.status = 'PAID' AND o.orderDate >= ?1")
    List<Order> findRecentPaidOrders(LocalDateTime since);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'PAID' AND o.orderDate BETWEEN ?1 AND ?2")
    Double calculateTotalRevenue(LocalDateTime startDate, LocalDateTime endDate);
}