-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: super_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

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
-- Base de datos: `super_db`
--
CREATE DATABASE IF NOT EXISTS `super_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `super_db`;

--
-- Table structure for table `cart_products`
--

DROP TABLE IF EXISTS `cart_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_products` (
  `cart_products_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `carts_id` int(10) unsigned NOT NULL,
  `products_id` int(10) unsigned NOT NULL,
  `cart_productsc_quantity` int(10) NOT NULL,
  `cart_products_price` decimal(9,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`cart_products_id`),
  KEY `fk_carts_cart_products_idx` (`carts_id`),
  KEY `fk_products_cart_products_idx` (`products_id`),
  CONSTRAINT `fk_carts_cart_products` FOREIGN KEY (`carts_id`) REFERENCES `carts` (`carts_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_cart_products` FOREIGN KEY (`products_id`) REFERENCES `products` (`products_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `carts_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`carts_id`),
  KEY `fk_users_carts_idx` (`users_id`),
  CONSTRAINT `fk_users_carts` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categories_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categories_description` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Enlatados y Envasados'),(2,'Limpieza'),(3,'Frescos'),(4,'Para el Hogar');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `marks_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `marks_description` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`marks_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES (1,'Lucchetti'),(2,'Paty'),(3,'Poett'),(4,'Cuisine & Co NBE'),(5,'Sherni Shiraz'),(6,'Presto Pronta'),(7,'Sin Marca'),(8,'Samsung'),(9,'Noblex'),(10,'Electrolux'),(11,'BGH'),(12,'Gallo');
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products`
--

DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `order_products_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orders_id` int(10) unsigned NOT NULL,
  `products_id` int(10) unsigned NOT NULL,
  `order_products_quantity` int(10) unsigned NOT NULL,
  `order_products_price` decimal(9,2) unsigned NOT NULL,
  PRIMARY KEY (`order_products_id`),
  KEY `fk_orders_idx` (`orders_id`),
  KEY `fk_products_idx` (`products_id`),
  CONSTRAINT `fk_orders` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`orders_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products` FOREIGN KEY (`products_id`) REFERENCES `products` (`products_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orders_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orders_date` datetime NOT NULL,
  `users_id` int(10) unsigned NOT NULL,
  `payment_types_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`orders_id`),
  KEY `fk_users_idx` (`users_id`),
  KEY `fk_payment_types_idx` (`payment_types_id`),
  CONSTRAINT `fk_payment_types` FOREIGN KEY (`payment_types_id`) REFERENCES `payment_types` (`payment_types_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_types`
--

DROP TABLE IF EXISTS `payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_types` (
  `payment_types_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `payment_types_description` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`payment_types_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (1,'Tarjeta Crédito'),(2,'Transferencia'),(3,'Tarjeta Débito');
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `products_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `products_name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `marks_id` int(10) unsigned NOT NULL,
  `products_description` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `products_image` varchar(55) CHARACTER SET utf8mb4 DEFAULT NULL,
  `categories_id` int(10) unsigned NOT NULL,
  `products_price` decimal(9,2) unsigned DEFAULT NULL,
  `products_discount` smallint(5) unsigned DEFAULT NULL,
  `products_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `products_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `products_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`products_id`),
  KEY `fk_marks_idx` (`marks_id`),
  KEY `fk_categories_idx` (`categories_id`),
  CONSTRAINT `fk_categories` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`categories_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_marks` FOREIGN KEY (`marks_id`) REFERENCES `marks` (`marks_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Fideos Tallarín Lucchetti',1,'Fideos Lucchetti Tallarín N5 X500g','Spaguetti.png',1,1005.97,10,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(2,'Hamburguesas Paty',2,'Hamburguesas Paty De Carne 4 U- 480 Gr','paty.png',1,2368.95,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(3,'Poett Desinfectante',3,'Poett Desinf. Frescura De Lavanda 1.8ml','Poett.png',2,748.11,5,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(4,'Lentejas Cuisine & Co',4,'Lentejas Cuisine & Co 300 gr.','Lentejas.png',1,469.78,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(5,'Vino Tinto Sherni Shiraz',5,'Vino Tinto Sherni Shiraz 750 ml.','vino.png',1,8732.00,10,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(6,'Polenta Presto Pronta',6,'Polenta Presto Pronta 500 gr.','Polenta.png',1,582.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(7,'Carne Picada',7,'Carne Picada seleccionada, precio por kg.','Carne-picada.webp',3,3495.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(8,'Celular',8,'Samsung Galaxy S23','s23.webp',4,300495.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(9,'Smart TV',9,'Noblex 4k 55 pulgadas','samrt.webp',4,530495.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(10,'Pollo',7,'Pollo entero, precio por kg.','pollo entero.webp',3,3200.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(11,'Pechuga de Pollo',7,'Pechugas de Pollo sin piel por kg','pechuga.webp',3,3700.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(12,'Merluza',7,'Merluza, precio por kg.','merluza.webp',3,4000.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(13,'Heladera',10,'Heladera Electrolux 35 fgr.','heladera.webp',4,550000.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(14,'Aire Acondicionado',11,'Aire Acondicionado BGH 3000 frigorias frio/calor','aire.webp',4,475000.00,15,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(15,'Arroz',12,'Arroz Fino Gallo 1 kg.','1702384456604_img_.png',1,1000.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `user_types_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_types_description` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`user_types_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'Administrador'),(2,'Consulta'),(3,'Comprador');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `users_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `users_username` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `users_firstName` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `users_lastName` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `users_email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `users_password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `user_types_id` int(10) unsigned NOT NULL,
  `users_image` varchar(55) COLLATE utf8_spanish_ci DEFAULT NULL,
  `users_active` tinyint(1) unsigned NOT NULL DEFAULT 1,
  `users_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `users_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`users_id`),
  KEY `fk_user_types_idx` (`user_types_id`),
  CONSTRAINT `fk_user_types` FOREIGN KEY (`user_types_id`) REFERENCES `user_types` (`user_types_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nico','Nicolas Angel','Herrera','nicoH@huffingtonpost.com','Nico123',3,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(2,'Fran','Francisco','Sequeira','tyitzhak1@bbb.org','Fran123',3,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(3,'Rami','Ramiro Marcelo','Rivera','ramrivera7@gmail.com','$2a$10$f82BkzZqs8tvGU/7mwXllOdEK/Pfe3MIOxZJErBnYMism84B0Oly.',1,'ramiro.jpeg',1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(4,'Ruby','Ruby','Cockram','rcockram4@scribd.com','Ruby123',2,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(5,'Berny','Bernard','Tolomelli','btolomelli5@gravatar.com','Berny123',2,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(6,'Ophelia','Ophelia','Allmond','oallmond6@friendfeed.com','Oph123',3,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(7,'Bald','Bald','Bacchus','bbacchus7@unc.edu','Bald123',3,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(8,'Jess','Jessie','Shelford','jshelford8@tripod.com','Jess123',3,NULL,1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(9,'nico','Nicolás','Herrera','niconh912@gmail.com','$2a$10$n20AaGZ89U.R6D.87RYMVuQggMnchvD9C2MxxZoIybQQeKXD/uh42',1,'1707320112908_img_.jpeg',1,'2024-02-08 15:47:44','0000-00-00 00:00:00'),(10,'Teru','Esteban','Trejo','teru@gmail.com','$2a$10$/iu8sB0TFUXhoPlSAewJOefbhJNtQ1JYr0RRZ9jZkW6ARMF9eDwDe',2,'1707320173065_img_.jpeg',1,'2024-02-08 15:47:44','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 18:02:12
