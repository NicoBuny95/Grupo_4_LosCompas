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
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Enlatados y Envasados'),(2,'Limpieza'),(3,'Frescos'),(4,'Para el Hogar');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES (1,'Lucchetti'),(2,'Paty'),(3,'Poett'),(4,'Cuisine & Co NBE'),(5,'Sherni Shiraz'),(6,'Presto Pronta'),(7,'Sin Marca'),(8,'Samsung'),(9,'Noblex'),(10,'Electrolux'),(11,'BGH'),(12,'Gallo');
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_products`
--

LOCK TABLES `order_products` WRITE;
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (1,'Tarjeta Crédito'),(2,'Transferencia'),(3,'Tarjeta Débito');
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Fideos Tallarín Lucchetti',1,'Fideos Lucchetti Tallarín N5 X500g','Spaguetti.png',1,1005.97,10,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(2,'Hamburguesas Paty',2,'Hamburguesas Paty De Carne 4 U- 480 Gr','paty.png',1,2368.95,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(3,'Poett Desinfectante',3,'Poett Desinf. Frescura De Lavanda 1.8ml','Poett.png',2,748.11,5,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(4,'Lentejas Cuisine & Co',4,'Lentejas Cuisine & Co 300 gr.','Lentejas.png',1,469.78,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(5,'Vino Tinto Sherni Shiraz',5,'Vino Tinto Sherni Shiraz 750 ml.','vino.png',1,8732.00,10,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(6,'Polenta Presto Pronta',6,'Polenta Presto Pronta 500 gr.','Polenta.png',1,582.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(7,'Carne Picada',7,'Carne Picada seleccionada, precio por kg.','Carne-picada.webp',3,3495.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(8,'Celular',8,'Samsung Galaxy S23','s23.webp',4,300495.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(9,'Smart TV',9,'Noblex 4k 55 pulgadas','samrt.webp',4,530495.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(10,'Pollo',7,'Pollo entero, precio por kg.','pollo entero.webp',3,3200.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(11,'Pechuga de Pollo',7,'Pechugas de Pollo sin piel por kg','pechuga.webp',3,3700.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(12,'Merluza',7,'Merluza, precio por kg.','merluza.webp',3,4000.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(13,'Heladera',10,'Heladera Electrolux 35 fgr.','heladera.webp',4,550000.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(14,'Aire Acondicionado',11,'Aire Acondicionado BGH 3000 frigorias frio/calor','aire.webp',4,475000.00,15,1,'2024-02-08 15:40:57','0000-00-00 00:00:00'),(15,'Arroz',12,'Arroz Fino Gallo 1 kg.','1702384456604_img_.png',1,1000.00,0,1,'2024-02-08 15:40:57','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'Administrador'),(2,'Consulta'),(3,'Comprador');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2024-02-08 18:01:25
