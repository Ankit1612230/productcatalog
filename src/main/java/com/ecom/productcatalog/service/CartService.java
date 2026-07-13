package com.ecom.productcatalog.service;

import com.ecom.productcatalog.model.Cart;
import com.ecom.productcatalog.model.CartItem;
import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.repository.CartItemRepository;
import com.ecom.productcatalog.repository.CartRepository;
import com.ecom.productcatalog.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.ecom.productcatalog.repository.UserRepository;
import com.ecom.productcatalog.model.User;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       ProductRepository productRepository, UserRepository userRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    public CartItem addToCart(Long userId, Long productId, Integer quantity) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));

                    Cart newCart = new Cart();
                    newCart.setUser(user);

                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

}