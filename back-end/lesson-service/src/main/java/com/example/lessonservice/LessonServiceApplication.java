package com.example.lessonservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

//help from https://www.youtube.com/watch?v=HFl2dzhVuUo
@SpringBootApplication
@EnableDiscoveryClient
public class LessonServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LessonServiceApplication.class, args);
	}

}
