package com.eurekakubernetes.authserver.service;

import com.eurekakubernetes.authserver.entity.User;
import com.eurekakubernetes.authserver.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createIfMissing("manager", "manager123", "MANAGER", "9876543210");
        createIfMissing("user", "user123", "USER", "9876543211");
    }

    private void createIfMissing(String username, String password, String role, String phone) {
        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            user.setPhone(phone);
            userRepository.save(user);
        }
    }
}
