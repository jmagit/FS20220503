-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: Autenticacion
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `idRol` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES ('Administradores','Administradores'),('Empleados','Empleados'),('Usuarios','Usuarios autenticados');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RolesPorUsuario`
--

DROP TABLE IF EXISTS `RolesPorUsuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RolesPorUsuario` (
  `idUsuarios` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idRol` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idUsuarios`,`idRol`),
  KEY `FK_RolesPorUsuario_Roles` (`idRol`),
  CONSTRAINT `FK_RolesPorUsuario_Roles` FOREIGN KEY (`idRol`) REFERENCES `Roles` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_RolesPorUsuario_Usuarios` FOREIGN KEY (`idUsuarios`) REFERENCES `Usuarios` (`idUsuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RolesPorUsuario`
--

LOCK TABLES `RolesPorUsuario` WRITE;
/*!40000 ALTER TABLE `RolesPorUsuario` DISABLE KEYS */;
INSERT INTO `RolesPorUsuario` VALUES ('adm@kk.kk','Administradores'),('admin','Administradores'),('emp@kk.kk','Empleados'),('adm@kk.kk','Usuarios'),('admin','Usuarios'),('emp@kk.kk','Usuarios'),('usr@kk.kk','Usuarios');
/*!40000 ALTER TABLE `RolesPorUsuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `idUsuarios` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`idUsuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES ('adm@kk.kk','$2b$10$5i7NYY8y3qmK3bmLmU8uMOHTawhPq7ddD7F6SfOf9ZKz76V8XssM6','Administrador','Usuarios,Administradores'),('admin','$2b$10$5i7NYY8y3qmK3bmLmU8uMOHTawhPq7ddD7F6SfOf9ZKz76V8XssM6','Administrador','Usuarios,Administradores'),('emp@kk.kk','$2b$10$5i7NYY8y3qmK3bmLmU8uMOHTawhPq7ddD7F6SfOf9ZKz76V8XssM6','Empleado','Usuarios,Empleados'),('usr@kk.kk','$2b$10$5i7NYY8y3qmK3bmLmU8uMOHTawhPq7ddD7F6SfOf9ZKz76V8XssM6','Usuario registrado','Usuarios');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-06 12:30:17
