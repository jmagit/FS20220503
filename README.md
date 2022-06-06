# ITINERARIO FULL STACK

## HTML

- Prototipo proyecto Crowdlending
- Formulario de clientes

### Ejemplos de refuerzo

  1. <https://www.w3schools.com/html>

## CSS

### Elementos

- Estilos diferenciados
- Variables
- Diseño adaptable (mobile first)
- flex y grid
- Consultas de medios, Imágenes
- Fuente propia
- Impresora
- *Animaciones y transformaciones*

### Enlaces

- [Fotos](https://picsum.photos/)
- [Iconos](https://fontawesome.com/)
- [Textos](https://www.lipsum.com/)
- [Flexbox](https://flexboxfroggy.com/#es)
- [Markdown](https://www.markdownguide.org/basic-syntax/)

### Ejemplos de refuerzo

  1. <https://www.w3schools.com/css>
  2. <https://www.w3schools.com/howto>

## JavaScript

Sgúen etsduios raleziaods por la Uivenrsdiad ignlsea de Cmdibrage, no ipmotra el odren en el que las ltears etsén ersciats, la úicna csoa ipormtnate es que la pmrirea y la útlima ltera esétn ecsritas en la psiócion cocrreta. El retso peuden etsar ttaolmntee doaerdsendo y aún pordás lerelo sin pobrleams, pquore no lemeos cada ltera en sí msima snio cdaa paalbra etenra.

Cuaquleir tetxo se pduee leer... si se respetan la primera y la última letra de cada palabra

- [El Tutorial de JavaScript Moderno](https://es.javascript.info/)
- <https://developer.mozilla.org/es/docs>

### Ejercicios

#### Sintaxis y funciones

1. Crear una función que devuelva un numero aleatorio (Math.random()) dentro del rango dado.
2. Adivina el Número, generar un número entre el 0 y el 100, introducir un número e informar si es igual, mayor o menor. Hay un máximo de 10 intentos para encontrar el número que sea igual.
3. Crear una función que devuelva un array con el numero de elementos indicado, inicializados al valor suministrado.
4. Crear una función que devuelva un determinado número de números primos.
5. Crear una función que valide un NIF
6. Definir una función que determine si la cadena de texto que se le pasa como parámetro es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".

#### Objetos

1. Crear la función constructora del juego Adivina el Número.
2. Crear la clase del juego Adivina el Número.

#### DOM

1. Calculadora.
2. Validar formulario de clientes.

### Ejercicios de refuerzo

  1. <https://www.discoduroderoer.es/category/ejercicio/javascript-ejercicio/>
  2. <https://www.arkaitzgarro.com/javascript/capitulo-18.html>
  3. <https://uniwebsidad.com/libros/javascript/capitulo-11>

## ReactJS

### Ejercicios

1. Calculadora.
2. Muro de imágenes.
3. Formularios
4. Sistema CRUD Contactos
5. Router: Transformar en aplicación los ejercicios anteriores
6. Redux: Sistema de notificaciones a usuario

---

## Native React

### Ejercicios

1. Calculadora.
2. Sistema CRUD Contactos
3. React Navigation: Adaptación de la aplicación a múltiples pantallas

### Bibliotecas

- <https://github.com/enaqx/awesome-react>
- <https://www.primefaces.org/primereact/>

---

## Microservicios

### Instalaciones de bases de datos

#### Contenedores

    docker run -d --name mysql-sakila -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 1maa/sakila:latest  
    docker run -d --name mongodb -p 27017:27017 mongo

#### Utilidades

- https://www.mongodb.com/try/download/compass  
- https://dev.mysql.com/downloads/workbench/
- https://www.heidisql.com/download.php  

### NodeJS

#### ORM

    npm install sequelize mysql2  
    npm install sequelize-auto --save-dev  
    npx sequelize-auto -o "./models" -e mysql -h localhost -p 3306 -d sakila -u root -x root

#### Ejercicios

1. Creación de un servidor
2. Acceso a bases de datos
3. API REST de Actores con ORM
4. Seguridad: autenticación y autorización
5. Incorporación de la autenticación y autorización en el front end

---

## Proyecto final

### Back End

- Microservicio: Promotores e Inversores
- Microservicio: Autenticación
- Requisitos adicionales
  - Base de datos relacional
  - Validaciones de servidor
  - Con batería de pruebas
  - *Documentado con OpenApi*
  - *Despliegue con Docker*

### Front End

- Aplicación React: Crowdlending
- Requisitos adicionales
  - Con batería de pruebas
  - Con enrutamientos
  - Validaciones de cliente
  - Con estilo propio: Diseño adaptable, BEM, ...
  - Accesible
