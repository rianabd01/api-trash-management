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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash`
--

LOCK TABLES `trash` WRITE;
/*!40000 ALTER TABLE `trash` DISABLE KEYS */;
INSERT INTO `trash` VALUES (1,'Sampah dijalan','Menyumbat Saluran air',1,'Jl. Gajah Mada','maps.google.com',3,1,0,'2024-06-06 19:05:27','2024-06-07 06:11:06'),(2,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 12:12:30','2024-06-06 12:13:38'),(5,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 15:59:32','2024-06-07 06:11:06'),(6,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:20:51','2024-06-07 06:11:06'),(7,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:21:40','2024-06-07 06:11:06'),(8,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:22:31','2024-06-07 06:11:06'),(9,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:23:52','2024-06-07 06:11:06'),(10,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',18,1,0,'2024-06-06 16:24:35','2024-06-07 06:11:06'),(11,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:29:16','2024-06-07 06:11:06'),(12,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:31:02','2024-06-07 06:11:06'),(13,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:33:23','2024-06-07 06:11:06'),(14,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',18,1,0,'2024-06-06 16:33:45','2024-06-07 06:11:06'),(15,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 16:34:56','2024-06-07 06:11:06'),(19,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',18,1,0,'2024-06-06 16:57:54','2024-06-07 06:11:06'),(20,'Test 6 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',18,1,0,'2024-06-06 17:01:20','2024-06-07 06:11:06'),(21,'Test 7 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 23:13:41','2024-06-07 06:14:20'),(22,'Test 7 Juni ','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 23:18:18','2024-06-07 06:35:05'),(23,'Test 7 Juni pagi','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,1,0,'2024-06-06 23:34:27','2024-06-07 06:35:05'),(24,'Test 7 Juni pagi','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,0,0,'2024-06-06 23:36:33','2024-06-06 23:36:33'),(25,'Test 7 Juni pagi','Banyak sampah plastik',1,'Jl Ahmad Dahlan','maps.google.com',3,0,0,'2024-06-06 23:54:14','2024-06-06 23:54:14');
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_pictures`
--

LOCK TABLES `trash_pictures` WRITE;
/*!40000 ALTER TABLE `trash_pictures` DISABLE KEYS */;
INSERT INTO `trash_pictures` VALUES (1,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/2/yQyTLoIOWcur1.png',2),(2,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/2/WehHRIHBsJFC2.jpg',2),(3,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/2/OySDtnUmyIJG3.jpg',2),(4,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/5/CWPvYiLafpZM1.jpg',5),(5,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/5/HQxbFMTOCqhO2.png',5),(6,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/5/QATzmOqeDahH3.png',5),(7,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/6/RyMYIYDptjth1.jpg',6),(8,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/6/HPKkpcpXUGQH2.png',6),(9,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/6/mtLbwMoUGVWs3.png',6),(10,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/7/GNimZxdIbupK1.jpg',7),(11,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/7/IiiXroXFyckX2.png',7),(12,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/7/RYwVWGKpSmBS3.png',7),(13,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/8/ZkAzypVolkKx1.jpg',8),(14,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/8/fVJkqOuRvLLx2.png',8),(15,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/8/bMmfTPZEHmte3.png',8),(16,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/9/yvBIoLHqpqZq1.jpg',9),(17,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/9/hIKwQBKWSOJq2.png',9),(18,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/9/DIKhQOTklbni3.png',9),(19,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/10/XNRwkYQnYGzE1.jpg',10),(20,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/10/ZUgpmIawAViM2.png',10),(21,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/10/tllXPNNJTsrx3.png',10),(22,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/11/njvBkgahNfDg1.jpg',11),(23,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/11/JnGDpCGOavVC2.png',11),(24,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/11/zUKqzJqAraCP3.png',11),(25,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/12/egWVObIibZQp1.jpg',12),(26,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/12/DyjthaNfqBjK2.png',12),(27,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/12/umXqhYXwjoev3.png',12),(28,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/13/NdBnHzdNgZQO1.jpg',13),(29,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/13/tHkFvOEYIeuU2.png',13),(30,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/13/NInFzmDUSuBi3.png',13),(31,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/14/CEuGAAfBtrps1.jpg',14),(32,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/14/WPyUjfQzHwpa2.png',14),(33,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/14/oFMebTLaPoct3.png',14),(34,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/ziNENpQNCeGz1.jpg',15),(35,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/IjAVSWjuzMjf2.png',15),(36,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/wQbQutOibdSL3.png',15),(37,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717693074561_fbPFgViaKriR19_1.jpg',19),(38,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717693074597_beEysrSHygCk19_2.png',19),(39,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717693074609_jDfGgUPjXwti19_3.png',19),(40,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717693280985_BpjHMBvazfHe20_1.jpg',20),(41,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717693281011_QcjuPnbjiyyT20_2.png',20),(42,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717693281022_IAjlfEWLNhfV20_3.png',20),(43,'uploads/trash/1717715621717_szwbRsLXDAGp21_1.jpg',21),(44,'uploads/trash/1717715621777_olPCcnDRWlNM21_2.png',21),(45,'uploads/trash/1717715621793_JVCSmvgnURvT21_3.png',21),(46,'uploads/trash/1717715898683_goDRWdIqadOU22_1.jpg',22),(47,'uploads/trash/1717715898706_LwzUzBSdaHgv22_2.png',22),(48,'uploads/trash/1717715898717_rOFgovelGFCX22_3.png',22),(49,'uploads/trash/1717716867932_ZgqWSBBozhZe23_1.jpg',23),(50,'uploads/trash/1717716867971_ITqgcJIabfto23_2.png',23),(51,'uploads/trash/1717716867986_LPvLlNjblDaA23_3.png',23),(52,'uploads/trash/1717716993077_LaTjfCiTisGo24_1.jpg',24),(53,'uploads/trash/1717716993094_GLMMwClAMirH24_2.png',24),(54,'uploads/trash/1717716993105_rTbUGGIONoWL24_3.png',24),(55,'uploads/trash/1717718054298_WWvLLqjaYILX25_1.jpg',25),(56,'uploads/trash/1717718054347_IKYELjxJeErw25_2.png',25),(57,'uploads/trash/1717718054367_xDgNrKZEeAIc25_3.png',25);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_proof`
--

LOCK TABLES `trash_proof` WRITE;
/*!40000 ALTER TABLE `trash_proof` DISABLE KEYS */;
INSERT INTO `trash_proof` VALUES (1,2,3,'Sudah saya bersihkan','terimakasih atas kontribusinya',1,'2024-06-06 12:15:15','2024-06-06 12:16:53'),(6,15,3,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:40:36','2024-06-06 16:40:36'),(7,15,3,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:41:10','2024-06-06 16:41:10'),(8,15,3,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:41:28','2024-06-06 16:41:28'),(9,15,18,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:42:10','2024-06-06 16:42:10'),(10,15,3,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:42:31','2024-06-06 16:42:31'),(11,15,18,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:42:51','2024-06-06 16:42:51'),(12,15,18,'Sudah saya bersihkan',NULL,0,'2024-06-06 16:43:06','2024-06-06 16:43:06'),(13,20,18,'Sudah saya bersihkan malam tadi',NULL,0,'2024-06-06 17:02:09','2024-06-06 17:02:09'),(14,25,3,'Sudah saya bersihkan malam tadi',NULL,0,'2024-06-06 23:54:28','2024-06-06 23:54:28'),(15,25,3,'Sudah saya bersihkan malam tadi',NULL,0,'2024-06-06 23:54:41','2024-06-06 23:54:41'),(16,24,3,'Sudah saya bersihkan malam tadi',NULL,1,'2024-06-06 23:57:17','2024-06-07 07:08:22');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash_proof_pictures`
--

LOCK TABLES `trash_proof_pictures` WRITE;
/*!40000 ALTER TABLE `trash_proof_pictures` DISABLE KEYS */;
INSERT INTO `trash_proof_pictures` VALUES (1,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/2/proof/ndJkoQeiBBqn1.jpg',1),(2,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/2/proof/SOZEWwRixtkh2.png',1),(3,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/2/proof/vaysDiUaJlWb3.jpg',1),(4,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/FhIahFkOALeh1.jpg',6),(5,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/DvpwHMacHJIz2.png',6),(6,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/MUctiPcDdMxJ3.png',6),(7,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/jqRvpebUwlRs1.jpg',7),(8,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/NvMtJUVeelYY2.png',7),(9,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/IqRaOvMnbSEF3.png',7),(10,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/aNHaBLVQyuwH1.jpg',8),(11,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/VhTyCzLooFus2.png',8),(12,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/pFKkQFdnRWiM3.png',8),(13,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/aZgLIwtztZhR1.jpg',9),(14,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/JHxOAdHlrrFf2.png',9),(15,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/nuPJWcgWMHbQ3.png',9),(16,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/sIhhBFsgfHtz1.jpg',10),(17,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/uqOUQTWrvXlk2.png',10),(18,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/hHKHiBbKFSSf3.png',10),(19,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/wgnkFoRHoqUQ1.jpg',11),(20,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/KsjfEWaobyii2.png',11),(21,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/jFxIYerEsZEL3.png',11),(22,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/SEamzucaVffY1.jpg',12),(23,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/HmgkVwTnzSXG2.png',12),(24,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/15/proof/oIcibuQMuWtQ3.png',12),(25,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717693329259_NpnrRRmnvvOg20_1.jpg',13),(26,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717693329282_WJIABtJJCBcM20_2.png',13),(27,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717693329294_gMpOdEhRfmmv20_3.png',13),(28,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718068573_qjLXzxMPSeBy25_1.jpg',14),(29,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718068625_xeLkKZBghpSk25_2.png',14),(30,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718068636_MhpIBFLHzViQ25_3.png',14),(31,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718081201_IerpiXRMcotL25_1.jpg',15),(32,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718081221_ydmccujFkJeC25_2.png',15),(33,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718081233_ZcxESWxpfVRk25_3.png',15),(34,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718237498_euBNAUlsnrPz24_1.jpg',16),(35,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718237533_EVTZyXWjXjxL24_2.png',16),(36,'http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1717718237548_lUhabtsvGCai24_3.png',16);
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
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Administrator','admin','admin','admin@gmail.com','0852435123',NULL,100,NULL,'2024-05-27 15:18:08','2024-06-04 17:31:54'),(2,'Ronaldo','user2','$2b$10$XIGC/TfLezsz2dk4akei8OFq5YZymxHgB2eKosQSNF1tVoNTfjaLa','email@email.com',NULL,'2002-05-04',0,NULL,'2024-06-05 02:46:58','2024-06-06 19:07:50'),(3,'Seseorang','stranger','stranger',NULL,NULL,NULL,0,NULL,'2024-05-27 15:33:06','2024-06-04 17:31:54'),(4,'User 1','user','user','user@gmail.com','0859896718654',NULL,0,NULL,'2024-05-27 15:19:11','2024-06-06 19:07:36'),(18,'Bang jay','jay','$2b$10$bJWzbgLkz5PwF3hZkyHkD./dWpxzqsVuPCUlxDV3aJwBpY9W5yfjG','bangajay@email.com',NULL,'2002-08-05',0,NULL,'2024-06-06 12:18:10','2024-06-06 12:18:10');
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

-- Dump completed on 2024-06-07  7:55:47
