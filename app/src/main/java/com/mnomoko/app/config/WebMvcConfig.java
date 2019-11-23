package com.mnomoko.app.config;

import com.mnomoko.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@EnableWebMvc
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

  @Autowired
  public WebMvcConfig(UserRepository userRepository) {
    // Ceci n'est pas à recopier en production
//    List<RoleEnum> userRole = Collections.singletonList(RoleEnum.USER);
//    List<RoleEnum> adminRole = Arrays.asList(RoleEnum.USER, RoleEnum.ADMINISTRATOR);
//    User user = new User("user", "user", "User", "USER", userRole);
//    User adminUser = new User("admin", "admin", "Admin", "ADMIN", adminRole);
//    userRepository.save(user);
//    userRepository.save(adminUser);
  }

  private final long MAX_AGE_SECS = 3600;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
            .maxAge(MAX_AGE_SECS);
  }

//  @Override
//  public void addViewControllers(ViewControllerRegistry registry) {
//    registry.addViewController("/").setViewName("index");
//    registry.addViewController("/login").setViewName("login");
//    registry.addViewController("/auth").setViewName("auth/auth");
//    registry.addViewController("/auth/admin").setViewName("auth/admin");
//  }
}
