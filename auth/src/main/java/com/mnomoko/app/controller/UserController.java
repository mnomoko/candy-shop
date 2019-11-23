package com.mnomoko.app.controller;

import com.mnomoko.app.model.User;
import com.mnomoko.app.repository.UserRepository;
import com.mnomoko.app.security.CurrentUser;
import com.mnomoko.app.security.exception.ResourceNotFoundException;
import com.mnomoko.app.security.payload.UserIdentityAvailability;
import com.mnomoko.app.security.payload.UserPrincipal;
import com.mnomoko.app.security.payload.UserProfile;
import com.mnomoko.app.security.payload.UserSummary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getFirstName(), currentUser.getLastName());
        return userSummary;
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfile userProfile = new UserProfile(user.getIdUser(), user.getUsername(), user.getFirstname(), user.getLastname());

        return userProfile;
    }

}
