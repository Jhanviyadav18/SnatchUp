package com.ecommerce.controller;

import com.ecommerce.model.User;
import com.ecommerce.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User createdUser = userService.createUser(user);
        // Clear the password in the response
        createdUser.setPassword(null);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateUserProfile(
            @Valid @RequestBody User userDetails,
            Authentication authentication) {
        
        User currentUser = userService.getUserByEmail(authentication.getName());
        userDetails.setId(currentUser.getId());
        
        User updatedUser = userService.updateUser(userDetails);
        updatedUser.setPassword(null);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody Map<String, String> passwordChange,
            Authentication authentication) {
        
        User user = userService.getUserByEmail(authentication.getName());
        
        userService.changePassword(
            user.getId(),
            passwordChange.get("oldPassword"),
            passwordChange.get("newPassword")
        );
        
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteUserProfile(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        userService.deleteUser(user.getId());
        return ResponseEntity.ok().build();
    }

    // Admin endpoints
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        
        if (!user.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.forbidden().build();
        }
        
        List<User> users = userService.getAllUsers();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id,
            Authentication authentication) {
        
        User currentUser = userService.getUserByEmail(authentication.getName());
        
        if (!currentUser.getRole().equals("ROLE_ADMIN") &&
            !currentUser.getId().equals(id)) {
            return ResponseEntity.forbidden().build();
        }
        
        User user = userService.getUserById(id);
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody User userDetails,
            Authentication authentication) {
        
        User currentUser = userService.getUserByEmail(authentication.getName());
        
        if (!currentUser.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.forbidden().build();
        }
        
        userDetails.setId(id);
        User updatedUser = userService.updateUser(userDetails);
        updatedUser.setPassword(null);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id,
            Authentication authentication) {
        
        User currentUser = userService.getUserByEmail(authentication.getName());
        
        if (!currentUser.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.forbidden().build();
        }
        
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}