package com.ecom.productcatalog.controller;

import com.ecom.productcatalog.dto.LoginResponse;
import com.ecom.productcatalog.model.User;
import com.ecom.productcatalog.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.ecom.productcatalog.dto.LoginRequest;
import com.ecom.productcatalog.dto.RegisterRequest;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return userService.register(user);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}