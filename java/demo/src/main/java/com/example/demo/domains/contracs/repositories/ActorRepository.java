package com.example.demo.domains.contracs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domains.entities.Actor;

public interface ActorRepository extends JpaRepository<Actor, Integer> {
	List<Actor> findTopNum5ByFirstNameStartingWith(String nombre);
	List<Actor> findByActorIdBetweenAndLastNameEndingWith(int idInicial, int idFinal, String letrasFinal);

}
