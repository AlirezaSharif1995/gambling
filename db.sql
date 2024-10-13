-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: game_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `game_results`
--

DROP TABLE IF EXISTS `game_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_results` (
  `game_id` varchar(36) NOT NULL,
  `player1_id` varchar(36) NOT NULL,
  `player2_id` varchar(36) NOT NULL,
  `player1_score` int NOT NULL,
  `player2_score` int NOT NULL,
  `winner_id` varchar(36) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_results`
--

LOCK TABLES `game_results` WRITE;
/*!40000 ALTER TABLE `game_results` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
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
INSERT INTO `group` VALUES ('07288','My New Group','0','This is a description of my new group.','2024-10-12 09:48:36','2024-10-12 09:48:36','15910',0,NULL,NULL),('09063','My New Group','0','This is a description of my new group.','2024-10-05 10:08:27','2024-10-05 10:08:27','23413',0,NULL,NULL),('09316','My New Group','0','This is a description of my new group.','2024-10-12 09:47:22','2024-10-12 09:47:22','15910',0,NULL,NULL),('12170','My New Group','0','This is a description of my new group.','2024-10-05 10:07:43','2024-10-05 10:07:43','23413',0,NULL,NULL),('15225','My New Group','0','This is a description of my new group.','2024-10-12 06:43:54','2024-10-12 06:43:54','15910',0,NULL,NULL),('24501','My New Group','0','This is a description of my new group.','2024-10-12 07:05:32','2024-10-12 07:05:32','15910',0,NULL,NULL),('39253','My New Group','0','This is a description of my new group.','2024-10-12 09:50:31','2024-10-12 09:50:31','15910',0,NULL,NULL),('58968','My New Group','0','This is a description of my new group.','2024-10-12 09:51:29','2024-10-12 09:51:29','15910',0,NULL,NULL),('59006','My New Group','0','This is a description of my new group.','2024-10-12 09:51:27','2024-10-12 09:51:27','15910',0,NULL,NULL),('63340','My New Group','0','This is a description of my new group.','2024-10-12 09:46:42','2024-10-12 09:46:42','15910',0,NULL,NULL),('65008','My New Group','0','This is a description of my new group.','2024-10-12 09:47:41','2024-10-12 09:47:41','15910',0,NULL,NULL),('65192','My New Group','0','This is a description of my new group.','2024-10-05 10:08:24','2024-10-05 10:08:24','23413',0,NULL,NULL),('66186','My New Group','0','This is a description of my new group.','2024-10-12 09:50:29','2024-10-12 09:50:29','15910',0,NULL,NULL),('67866','My New Group','0','This is a description of my new group.','2024-10-12 09:48:56','2024-10-12 09:48:56','15910',0,NULL,NULL),('96093','My New Group','0','This is a description of my new group.','2024-10-05 10:08:28','2024-10-05 10:08:28','23413',0,NULL,NULL),('98717','My New Group','0','This is a description of my new group.','2024-10-12 09:51:28','2024-10-12 09:51:28','15910',0,NULL,NULL);
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
  `awards` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `groups` json DEFAULT NULL,
  `bio` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'90587','alireza','ali@s.c','12345',NULL,NULL,'{}','{}','[]',NULL,0,0,0,NULL,'2024-09-18 12:21:05',NULL,''),(2,'23413','alireza','ali@s.c','$2a$10$xs2FcYWOyXxDiZliQoiub.iRViZzv91pYia1UMWxEf4zxKSXN1kt6',NULL,NULL,'[\"211\"]','{}','[]',NULL,0,0,0,NULL,'2024-09-18 12:56:13',NULL,''),(3,'57631','alireza','ali@s.c','$2a$10$Vpt95FrGx1OsQMtb8YXOFu0MtTmntdjmyyz4NkwftvaEZcSQzHuIC',NULL,NULL,'{}','{}','[]',NULL,0,0,0,NULL,'2024-09-18 13:21:09',NULL,''),(4,'57234','alireza','ali@s.c','$2a$10$/WixrKroOkPtgSQywpk9gOGT2RQURLgbzQ.5lC4txVo7IlQNCKhRK',NULL,NULL,'{}','{}','[]',NULL,0,0,0,NULL,'2024-09-18 13:21:11',NULL,''),(5,'85111','alireza','ali@s.cm','$2a$10$6a3egYi4oqhnkonENGzxS.tY4Bl2IUzZQEL5knNyoyZAyfubnf9pC',NULL,NULL,'{}','{}','[]',NULL,0,0,0,NULL,'2024-09-18 13:29:25',NULL,''),(6,'71652','alireza','saas','$2a$10$3Q/zz731WpQxJolLsOcaw.LeODS0KgHO1g825rAMxWOPQdMjpibAC',NULL,NULL,'[]','[]','[]',NULL,1,-1,0,NULL,'2024-09-29 09:42:02',NULL,''),(7,'15910','Alireza','ali@s.c','$2a$10$pIBYoyX8YHT2mDcAB9gRrOSmUpt7issPFHx3ShzWELu92U9UOsiVC','1995-02-23 03:30:00.000','2','[]','[\"41088\",\"20\"]','[\"211\"]',NULL,0,-3,0,NULL,'2024-10-02 07:42:33','[\"66186\", \"59006\", \"98717\", \"58968\"]',''),(8,'82577','alireza','ali@s.c','$2a$10$YKH53weg6exP/zvyfSUtkO9F9jXCLjmaUFda.p/qTPLJOEftU1d7S',NULL,NULL,'{}','{}','[]',NULL,0,0,0,NULL,'2024-10-02 07:42:36',NULL,''),(9,'60930',NULL,NULL,NULL,NULL,NULL,'{}','{}','[]',NULL,0,0,0,NULL,'2024-10-02 08:03:20',NULL,''),(10,'41088','Alireza',NULL,NULL,'1995-02-23 03:30:00.000','3','{}','{}','[]',NULL,0,0,0,NULL,'2024-10-02 08:41:38',NULL,''),(11,'00367',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-06 10:00:29',NULL,''),(12,'66808',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 17:56:26',NULL,''),(13,'70159',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 17:58:04',NULL,''),(14,'38343',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 18:27:34',NULL,''),(15,'29298','Guest_29298',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 18:30:36',NULL,''),(16,'73773',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 20:29:58',NULL,''),(17,'89067',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 20:32:37',NULL,''),(18,'62217','Guest_62217',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 20:32:44',NULL,''),(19,'40385',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 20:34:33',NULL,''),(20,'04033','Hamid',NULL,NULL,NULL,'17','[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 20:36:52',NULL,'asdlkaflkjasdf'),(21,'28660',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:33:58',NULL,''),(22,'95537',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:38:08',NULL,''),(23,'31380','Guest_31380',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:38:42',NULL,NULL),(24,'74406','Guest_74406',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:38:46',NULL,NULL),(25,'62557','Guest_62557',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:38:50',NULL,NULL),(26,'48970','Guest_48970',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:38:53',NULL,NULL),(27,'81313',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:39:18',NULL,''),(28,'62764','Guest_62764',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:39:21',NULL,NULL),(29,'35743',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:40:20',NULL,''),(30,'71682','Guest_71682',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:40:25',NULL,NULL),(31,'79356',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:42:51',NULL,''),(32,'77377','Guest_77377',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:42:54',NULL,NULL),(33,'29369',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:43:19',NULL,''),(34,'93597','Guest_93597',NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,NULL,NULL,'2024-10-13 22:43:23',NULL,'fghfgdhdhfg'),(35,'78165','Guest_78165',NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,NULL,NULL,'2024-10-13 22:44:47',NULL,''),(36,'61571',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:47:15',NULL,''),(37,'13780',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:48:47',NULL,''),(38,'81010',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:51:07',NULL,''),(39,'68418',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:51:28',NULL,''),(40,'96718',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:53:52',NULL,''),(41,'23986',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:54:44',NULL,''),(42,'32349','Guest_32349',NULL,NULL,'','0','[]','[]','[]',NULL,0,0,150,NULL,'2024-10-13 22:55:43',NULL,''),(43,'58278',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:56:11',NULL,''),(44,'21601',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:56:36',NULL,''),(45,'14808',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:57:28',NULL,''),(46,'69611',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:57:44',NULL,''),(47,'06619',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 22:58:58',NULL,''),(48,'93350',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 23:00:38',NULL,''),(49,'49367',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 23:01:55',NULL,''),(50,'03485',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',NULL,0,0,0,NULL,'2024-10-13 23:03:22',NULL,'');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 15:05:52