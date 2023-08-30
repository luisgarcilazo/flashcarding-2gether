package com.example.flashcarding2gether;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class Flashcarding2getherApplication {

	public static void main(String[] args) {
		SpringApplication.run(Flashcarding2getherApplication.class, args);
	}
	//help from https://stackoverflow.com/questions/36151421/could-not-autowire-fieldresttemplate-in-spring-boot-application
	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}
}
