-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: game_db
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `leader_id` varchar(36) NOT NULL,
  `is_private` tinyint(1) DEFAULT '0',
  `members` text,
  `roles` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES ('09063','My New Group','0','This is a description of my new group.','2024-10-05 10:08:27','2024-10-05 10:08:27','23413',0,NULL,NULL),('12170','My New Group','0','This is a description of my new group.','2024-10-05 10:07:43','2024-10-05 10:07:43','23413',0,NULL,NULL),('65192','My New Group','0','This is a description of my new group.','2024-10-05 10:08:24','2024-10-05 10:08:24','23413',0,NULL,NULL),('96093','My New Group','0','This is a description of my new group.','2024-10-05 10:08:28','2024-10-05 10:08:28','23413',0,NULL,NULL);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playerToken` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `googleUserID` varchar(255) DEFAULT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `friendsRequests` varchar(255) DEFAULT '[]',
  `friendsList` varchar(255) DEFAULT '[]',
  `blockList` varchar(255) DEFAULT '[]',
  `playerscol` varchar(45) DEFAULT NULL,
  `winCount` int DEFAULT '0',
  `loseCount` int DEFAULT '0',
  `coins` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'90587','alireza','ali@s.c','12345',NULL,NULL,'{}','{}','[]',NULL,0,0,0,'2024-09-18 12:21:05'),(2,'23413','alireza','ali@s.c','$2a$10$xs2FcYWOyXxDiZliQoiub.iRViZzv91pYia1UMWxEf4zxKSXN1kt6',NULL,NULL,'[\"211\"]','{}','[]',NULL,0,0,0,'2024-09-18 12:56:13'),(3,'57631','alireza','ali@s.c','$2a$10$Vpt95FrGx1OsQMtb8YXOFu0MtTmntdjmyyz4NkwftvaEZcSQzHuIC',NULL,NULL,'{}','{}','[]',NULL,0,0,0,'2024-09-18 13:21:09'),(4,'57234','alireza','ali@s.c','$2a$10$/WixrKroOkPtgSQywpk9gOGT2RQURLgbzQ.5lC4txVo7IlQNCKhRK',NULL,NULL,'{}','{}','[]',NULL,0,0,0,'2024-09-18 13:21:11'),(5,'85111','alireza','ali@s.cm','$2a$10$6a3egYi4oqhnkonENGzxS.tY4Bl2IUzZQEL5knNyoyZAyfubnf9pC',NULL,NULL,'{}','{}','[]',NULL,0,0,0,'2024-09-18 13:29:25'),(6,'71652','alireza','saas','$2a$10$3Q/zz731WpQxJolLsOcaw.LeODS0KgHO1g825rAMxWOPQdMjpibAC',NULL,NULL,'[]','[]','[]',NULL,1,-1,0,'2024-09-29 09:42:02'),(7,'15910','Alireza','ali@s.c','$2a$10$pIBYoyX8YHT2mDcAB9gRrOSmUpt7issPFHx3ShzWELu92U9UOsiVC','1995-02-23 03:30:00.000','2','[\"211\"]','[\"41088\",\"20\"]','[\"1\"]',NULL,0,0,0,'2024-10-02 07:42:33'),(8,'82577','alireza','ali@s.c','$2a$10$YKH53weg6exP/zvyfSUtkO9F9jXCLjmaUFda.p/qTPLJOEftU1d7S',NULL,NULL,'{}','{}','[]',NULL,0,0,0,'2024-10-02 07:42:36'),(9,'60930',NULL,NULL,NULL,NULL,NULL,'{}','{}','[]',NULL,0,0,0,'2024-10-02 08:03:20'),(10,'41088','Alireza',NULL,NULL,'1995-02-23 03:30:00.000','3','{}','{}','[]',NULL,0,0,0,'2024-10-02 08:41:38'),(11,'00367',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,'2024-10-06 10:00:29');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'game_db'
--

--
-- Dumping routines for database 'game_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-06 14:34:30
