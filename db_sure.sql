-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: sure_application
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `province_id` int NOT NULL,
  PRIMARY KEY (`city_id`),
  KEY `province_id` (`province_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`province_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Kota Jakarta Timur',1),(2,'Kota Jakarta Selatan',1),(3,'Kota Jakarta Utara',1),(4,'Kota Jakarta Barat',1),(5,'Kota Jakarta Pusat',1),(6,'Kabupaten Kepulauan Seribu',1),(7,'Kecamatan Bogor Timur',2),(8,'Kecamatan Bogor Selatan',2),(9,'Kecamatan Bogor Utara',2),(10,'Kecamatan Bogor Barat',2),(11,'Kecamatan Bogor Tengah',2),(12,'Kecamatan Tanah Sareal',2),(13,'Kecamatan Beji',3),(14,'Kecamatan Bojongsari',3),(15,'Kecamatan Cilodong',3),(16,'Kecamatan Cimanggis',3),(17,'Kecamatan Cinere',3),(18,'Kecamatan Cipayung',3),(19,'Kecamatan Limo',3),(20,'Kecamatan Pancoran Mas',3),(21,'Kecamatan Sawangan',3),(22,'Kecamatan Sukmajaya',3),(23,'Kecamatan Tapos',3),(24,'Kecamatan Batuceper',4),(25,'Kecamatan Benda',4),(26,'Kecamatan Cibodas',4),(27,'Kecamatan Ciledug',4),(28,'Kecamatan Cipondoh',4),(29,'Kecamatan Jatiuwung',4),(30,'Kecamatan Karangtengah',4),(31,'Kecamatan Karawaci',4),(32,'Kecamatan Larangan',4),(33,'Kecamatan Neglasari',4),(34,'Kecamatan Periuk',4),(35,'Kecamatan Pinang',4),(36,'Kecamatan Tangerang',4),(37,'Kecamatan Bantar Gebang',5),(38,'Kecamatan Bekasi Barat',5),(39,'Kecamatan Bekasi Selatan',5),(40,'Kecamatan Bekasi Timur',5),(41,'Kecamatan Bekasi Utara',5),(42,'Kecamatan Jatiasih',5),(43,'Kecamatan Jatisampurna',5),(44,'Kecamatan Medan Satria',5),(45,'Kecamatan Mustika Jaya',5),(46,'Kecamatan Pondok Gede',5),(47,'Kecamatan Pondok Melati',5),(48,'Kecamatan Rawalumbu',5);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_verifications`
--

DROP TABLE IF EXISTS `otp_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_verifications` (
  `otp_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `otp` varchar(45) DEFAULT NULL,
  `expired_at` timestamp NOT NULL,
  PRIMARY KEY (`otp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_verifications`
--

LOCK TABLES `otp_verifications` WRITE;
/*!40000 ALTER TABLE `otp_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provinces` (
  `province_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces`
--

LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES (1,'Jakarta'),(2,'Bogor'),(3,'Depok'),(4,'Tangerang'),(5,'Bekasi');
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trash`
--

DROP TABLE IF EXISTS `trash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash` (
  `trash_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `city_id` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `location_url` varchar(255) DEFAULT NULL,
  `user_uploader_id` int DEFAULT '3',
  `is_verified` tinyint(1) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`trash_id`),
  KEY `user_uploader_id` (`user_uploader_id`),
  KEY `city_idx` (`city_id`),
  CONSTRAINT `city` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `trash_ibfk_1` FOREIGN KEY (`user_uploader_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash`
--

LOCK TABLES `trash` WRITE;
/*!40000 ALTER TABLE `trash` DISABLE KEYS */;
INSERT INTO `trash` VALUES (1,'Sampah di sungai','Sungainya penuh sampah, airnya sangat keruh. Plastik, botol, dan sisa makanan mengapung, mencemari air. Tercium bau tak sedap, dan mengganggu suasana. Pemandangan ini bikin saya prihatin, butuh perhatian dan aksi nyata agar kali kembali bersih.',1,'Jl Ahmad Dahlan','maps.google.com',20,1,0,'2024-06-07 03:32:16','2024-06-07 10:32:48');
/*!40000 ALTER TABLE `trash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trash_pictures`
--

DROP TABLE IF EXISTS `trash_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash_pictures` (
  `picture_id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) NOT NULL,
  `trash_id` int NOT NULL,
  PRIMARY KEY (`picture_id`),
  KEY `trash_id` (`trash_id`),
  CONSTRAINT `trash_pictures_ibfk_1` FOREIGN KEY (`trash_id`) REFERENCES `trash` (`trash_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_pictures`
--

LOCK TABLES `trash_pictures` WRITE;
/*!40000 ALTER TABLE `trash_pictures` DISABLE KEYS */;
INSERT INTO `trash_pictures` VALUES (1,'/uploads/trash/1717731136247_UXhGFaYCSyki1_1.jpg',1),(2,'/uploads/trash/1717731136272_hxanyMRjejfk1_2.png',1),(3,'/uploads/trash/1717731136284_WmMWPhMoZiGi1_3.png',1);
/*!40000 ALTER TABLE `trash_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trash_proof`
--

DROP TABLE IF EXISTS `trash_proof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash_proof` (
  `trash_proof_id` int NOT NULL AUTO_INCREMENT,
  `trash_id` int NOT NULL,
  `user_id` int DEFAULT '3',
  `user_message` text,
  `feedback` text,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`trash_proof_id`),
  KEY `trash_id` (`trash_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `trash_proof_ibfk_1` FOREIGN KEY (`trash_id`) REFERENCES `trash` (`trash_id`),
  CONSTRAINT `trash_proof_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_proof`
--

LOCK TABLES `trash_proof` WRITE;
/*!40000 ALTER TABLE `trash_proof` DISABLE KEYS */;
INSERT INTO `trash_proof` VALUES (2,1,3,'Sudah kami bersihkan bersama kawan-kawan komuniatas PeduliSampah. Kami harap kita semua lebih peduli untuk menjaga kebersihan. Jangan buang sampah sembarangan, mari kita rawat lingkungan bersama-sama. Jika kita semua berkontribusi, kali ini bisa tetap bersih dan indah.',NULL,0,'2024-06-07 03:35:34','2024-06-07 03:35:34');
/*!40000 ALTER TABLE `trash_proof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trash_proof_pictures`
--

DROP TABLE IF EXISTS `trash_proof_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash_proof_pictures` (
  `picture_id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) NOT NULL,
  `trash_proof_id` int NOT NULL,
  PRIMARY KEY (`picture_id`),
  KEY `trash_proof_id` (`trash_proof_id`),
  CONSTRAINT `trash_proof_pictures_ibfk_1` FOREIGN KEY (`trash_proof_id`) REFERENCES `trash_proof` (`trash_proof_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_proof_pictures`
--

LOCK TABLES `trash_proof_pictures` WRITE;
/*!40000 ALTER TABLE `trash_proof_pictures` DISABLE KEYS */;
INSERT INTO `trash_proof_pictures` VALUES (1,'/uploads/proof/1717731334858_AjnZBwLFuauG1_1.jpg',2),(2,'/uploads/proof/1717731334876_yFbjXiIKSyjA1_2.png',2),(3,'/uploads/proof/1717731334886_ikYbqPDzSipn1_3.png',2);
/*!40000 ALTER TABLE `trash_proof_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `level` int DEFAULT '0',
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_verified` tinyint DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Administrator','admin','admin','admin@gmail.com','0852435123',NULL,100,NULL,1,'2024-05-27 15:18:08','2024-06-08 06:03:40'),(2,'Ronaldo','user2','$2b$10$XIGC/TfLezsz2dk4akei8OFq5YZymxHgB2eKosQSNF1tVoNTfjaLa','email@email.com',NULL,'2002-05-04',0,NULL,1,'2024-06-05 02:46:58','2024-06-08 06:03:40'),(3,'Seseorang','stranger','stranger',NULL,NULL,NULL,0,NULL,1,'2024-05-27 15:33:06','2024-06-08 06:03:40'),(4,'User 1','user','user','user@gmail.com','0859896718654',NULL,0,NULL,0,'2024-05-27 15:19:11','2024-06-06 19:07:36'),(18,'Bang jay','jay','$2b$10$bJWzbgLkz5PwF3hZkyHkD./dWpxzqsVuPCUlxDV3aJwBpY9W5yfjG','bangajay@email.com',NULL,'2002-08-05',0,NULL,1,'2024-06-06 12:18:10','2024-06-08 07:25:11'),(19,'Bang jay','jayjay','$2b$10$Fe0vjIT8YytkfPfIxdUlyeku7ccYeLOSwKFlXHMr47aeYK..qTbyS','bangajayjay@email.com',NULL,'2002-08-05',0,NULL,0,'2024-06-07 02:50:11','2024-06-07 02:50:11'),(20,'Rian Abd','rianabd01','$2b$10$xZoW18GvrBeCQIh3ZefAZOKLXnoPVuSS0nRcunyLTRxd2Du.AzCVS','rianabd010203@gmail.com',NULL,'2002-08-05',0,NULL,0,'2024-06-07 03:26:52','2024-06-07 03:26:52');
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

-- Dump completed on 2024-06-08  7:47:12
