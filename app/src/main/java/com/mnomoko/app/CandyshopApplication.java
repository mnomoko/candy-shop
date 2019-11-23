package com.mnomoko.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

//@SpringBootApplication(
//		scanBasePackages = "com.mnomoko.app",
//		exclude = { org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class}
//)
@EnableWebSecurity
@SpringBootApplication(scanBasePackages = "com.mnomoko.app")
public class CandyshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(CandyshopApplication.class, args);
	}

}
