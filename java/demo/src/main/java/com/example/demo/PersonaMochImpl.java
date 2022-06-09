package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class PersonaMochImpl implements Persona {
	@Override
	public void saluda() {
		System.out.println("Hola!!!");
	}
	@Override
	public void despide() {
		System.out.println("Adios!!!");
	}

}
