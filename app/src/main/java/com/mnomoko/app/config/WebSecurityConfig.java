package com.mnomoko.app.config;

import com.mnomoko.app.enums.RoleEnum;
import com.mnomoko.app.filter.JwtAuthenticationEntryPoint;
import com.mnomoko.app.filter.JwtAuthenticationFilter;
import com.mnomoko.app.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final String adminRole = RoleEnum.ADMINISTRATOR.name();

  private final CustomUserDetailsService customUserDetailsService;

  @Autowired
  private JwtAuthenticationEntryPoint unauthorizedHandler;

  @Autowired
  public WebSecurityConfig(@Qualifier("customUserDetailsService") CustomUserDetailsService customUserDetailsService) {
    this.customUserDetailsService = customUserDetailsService;
  }

  @Bean(name = "passwordEncoder")
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter();
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Autowired
  public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
//    http
//      .csrf().disable()
//      .formLogin().disable();
//    http
//      .httpBasic()
//      .and()
//        .authorizeRequests()
//          .antMatchers("/**").hasAnyRole("1", "2")
////          .antMatchers(HttpMethod.POST, "/api/**").hasAnyRole("USER", "ADMIN")
////          .antMatchers(HttpMethod.PUT, "/api/**").hasAnyRole("USER", "ADMIN")
////          .antMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("USER", "ADMIN")
////          .antMatchers(HttpMethod.DELETE, "/api/**").hasAnyRole("ADMIN", "ADMIN")
////          .antMatchers(HttpMethod.DELETE, "/api/**").hasAnyAuthority("ADMIN", "ADMIN")
////      .and()
////        .authorizeRequests()
//          .anyRequest().authenticated()
////      .and()
////      .formLogin().disable()
//    ;

    http
            .cors()
            .and()
            .csrf()
            .disable()
            .exceptionHandling()
            .authenticationEntryPoint(unauthorizedHandler)
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/",
                    "/favicon.ico",
                    "/**/*.png",
                    "/**/*.gif",
                    "/**/*.svg",
                    "/**/*.jpg",
                    "/**/*.html",
                    "/**/*.css",
                    "/**/*.js")
            .permitAll()
            .antMatchers("/api/auth/**")
            .permitAll()
            .antMatchers("/api/user/checkUsernameAvailability")
            .permitAll()
//            .antMatchers(HttpMethod.GET, "/api/categories/**", "/api/users/**")
//            .authenticated()
            .anyRequest()
            .authenticated();

    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
  }
}
