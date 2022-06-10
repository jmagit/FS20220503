package com.example.demo;

import javax.transaction.Transactional;
import javax.transaction.TransactionalException;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;

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
	@Autowired // Validation.buildDefaultValidatorFactory().getValidator()
	private Validator validator;

	@Override
//	@Transactional
	public void run(String... args) throws Exception {
		persona.saluda();
		System.out.println("Hola mundo");
		persona.despide();
		try {
			actualizaNombre("P");
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}
		
		// dao.findAll().forEach(item -> System.out.println(item));
//		actor.getFilmActors().forEach(item -> System.out.println(item.getFilm().getTitle()));
//		dao.findByActorIdBetweenAndLastNameEndingWith(50, 100, "a").forEach(item -> System.out.println(item));
//		dao.findTopNum5ByFirstNameStartingWith("P").forEach(item -> System.out.println(item));

	}

	@Transactional
	private void actualizaNombre(String nombre) throws Exception {
		var actor = dao.findById(1).get();
		actor.setFirstName(nombre);
		var constraintViolations = validator.validate(actor);
		if (constraintViolations.size() > 0) {
			constraintViolations.forEach(item -> System.out.println(item.getPropertyPath() + ": " + item.getMessage()));
			throw new Exception("Error de validación");
		} else {
			dao.save(actor);
		}
		
	}
}
