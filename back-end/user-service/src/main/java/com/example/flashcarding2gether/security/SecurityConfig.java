package com.example.flashcarding2gether.security;

import com.example.flashcarding2gether.service.UserInfoService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //code was gotten from tutorials in https://www.udemy.com/course/spring-hibernate-tutorial
    //used for authenticating the user from a class that inherits UserDetailsService
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserInfoService userInfoService) {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userInfoService); //set user service
        auth.setPasswordEncoder(passwordEncoder()); //set password encoder
        return auth;
    }
    //filter chain used for securing the endpoints depending on role
    //not all of them may have been used
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults()).authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers(HttpMethod.GET, "/users").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/{username}").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/users/{username}").hasRole("DEV")
                        .requestMatchers(HttpMethod.POST, "/users/dev").hasRole("DEV")
                        .requestMatchers(HttpMethod.POST, "/users/basic").permitAll()
                        .requestMatchers(HttpMethod.POST,"/users/login").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/users/update/password").hasRole("BASIC")

        );
        // use HTTP Basic authentication
        http.httpBasic(Customizer.withDefaults());

        // disable Cross Site Request Forgery (CSRF)
        // in general, not required for stateless REST APIs that use POST, PUT, DELETE, and/or PATCH
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

    //https://docs.spring.io/spring-security/reference/reactive/integrations/cors.html
    // and
    // https://reflectoring.io/spring-cors/
    // and
    // https://www.youtube.com/watch?v=HRwlT_etr60
    //were used for help
    //configures CORS for allowing communication between the API and localhost:4200 (Angular APP)
    //Allows for GET, POST, DELETE, and Put
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
//        configuration.setAllowedMethods(Arrays.asList("GET","POST", "DELETE", "PUT"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
