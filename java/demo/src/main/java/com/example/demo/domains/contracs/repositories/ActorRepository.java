package com.example.demo.domains.contracs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domains.entities.Actor;

public interface ActorRepository extends JpaRepository<Actor, Integer> {

}
