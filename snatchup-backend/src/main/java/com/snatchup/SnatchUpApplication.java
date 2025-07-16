package com.snatchup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class SnatchUpApplication {

    public static void main(String[] args) {
        SpringApplication.run(SnatchUpApplication.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "Welcome to SnatchUp Backend!";
    }
}
