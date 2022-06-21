package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
public class CalculadoraTest {
	@Nested
	class Sumas {
		@Nested
		class OK {
			@Test
			void Suma_positivos() {
				var calc = new Calculadora();
				
				var actual = calc.suma(2, 3);
				
				assertEquals(5, actual);				
			}
			@Test
			void Suma_positivo_negativo() {
				var calc = new Calculadora();
				
				var actual = calc.suma(2, -3);
				
				assertEquals(-1, actual);				
			}
			
			@ParameterizedTest(name = "{displayName} {0} + {1} = {2}")
			@CsvSource({"1,2,3","3,-1,2","-1,2,1","-1,-1,-2","0,0,0"})
			void Sumas_OK(double operando1, double operando2, double resultado) {
				var calc = new Calculadora();
				
				var actual = calc.suma(operando1, operando2);
				
				assertEquals(resultado, actual);				
			}
		}
		@Nested
		class KO {
			@Test
			void Suma_positivos() {
				var calc = new Calculadora();
				
				var actual = calc.suma(0.1, 0.2);
				
				assertEquals(0.3, actual);				
			}
			
		}
	}
	@Nested
	class Divisiones {
		Calculadora calculadora;
		@BeforeEach
		void inicializa() {
			calculadora = new Calculadora();
		}
		@Nested
		class OK {
			@Test
			@DisplayName("División de numeros enteros")
			void divide() {
				assertEquals(1, calculadora.divide(3, 2), "entera");				
				assertEquals(1.5, calculadora.divide(3.0, 2), "real");				
			}
			
		}
		@Nested
		class KO {
			@Test
			@DisplayName("División enteros por 0")
			void divide_enteros() {
				assertThrows(ArithmeticException.class, () -> calculadora.divide(3, 0));
			}
			@Test
			@DisplayName("División real por 0")
			void divide_real() {
				assertThrows(ArithmeticException.class, () -> calculadora.divide(3.0, 0));
			}
			
		}
	}
}
