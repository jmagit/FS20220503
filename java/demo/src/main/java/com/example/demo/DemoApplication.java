package com.example.demo;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.domains.contracs.repositories.ActorRepository;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Autowired
	Persona persona;
	
	@Autowired
	ActorRepository dao;
	
	@Override
	public void run(String... args) throws Exception {
		persona.saluda();
		System.out.println("Hola mundo");
		persona.despide();
		
		dao.findAll().forEach(item -> System.out.println(item));
	}

}
