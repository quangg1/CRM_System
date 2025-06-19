-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: switchback.proxy.rlwy.net    Database: crm_system
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `id` varchar(36) NOT NULL,
  `interaction_id` varchar(36) NOT NULL,
  `type` enum('call','email','meeting','note') NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_interaction_id` (`interaction_id`),
  KEY `idx_type` (`type`),
  KEY `idx_activity_created` (`created_at`),
  CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`interaction_id`) REFERENCES `interactions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES ('cde01938-4ca0-11f0-bf06-a2aa668fea34','cdcb7adf-4ca0-11f0-bf06-a2aa668fea34','note','Pre-meeting Notes','Prepare quarterly performance metrics and ROI analysis','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde02117-4ca0-11f0-bf06-a2aa668fea34','cdcb7adf-4ca0-11f0-bf06-a2aa668fea34','email','Meeting Agenda','Sent detailed agenda for the quarterly review meeting','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde022c2-4ca0-11f0-bf06-a2aa668fea34','cdcb84cc-4ca0-11f0-bf06-a2aa668fea34','note','Support Issues Summary','Compiled list of support tickets and resolutions','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde023e7-4ca0-11f0-bf06-a2aa668fea34','cdcb84cc-4ca0-11f0-bf06-a2aa668fea34','email','Support Documentation','Sent updated support documentation and FAQs','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde02580-4ca0-11f0-bf06-a2aa668fea34','cdcb87a6-4ca0-11f0-bf06-a2aa668fea34','note','Strategy Planning','Prepared strategic initiatives for Q1 2025','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde026b1-4ca0-11f0-bf06-a2aa668fea34','cdcb87a6-4ca0-11f0-bf06-a2aa668fea34','email','Meeting Preparation','Sent market analysis and competitor information','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde027ab-4ca0-11f0-bf06-a2aa668fea34','cdcb8acd-4ca0-11f0-bf06-a2aa668fea34','note','Implementation Progress','Tracked implementation milestones and progress','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde02891-4ca0-11f0-bf06-a2aa668fea34','cdcb8acd-4ca0-11f0-bf06-a2aa668fea34','email','Progress Report','Sent detailed progress report and next steps','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde02988-4ca0-11f0-bf06-a2aa668fea34','cdcb8cdc-4ca0-11f0-bf06-a2aa668fea34','note','Onboarding Checklist','Prepared onboarding checklist and timeline','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cde02a9b-4ca0-11f0-bf06-a2aa668fea34','cdcb8cdc-4ca0-11f0-bf06-a2aa668fea34','email','Welcome Package','Sent welcome package and getting started guide','2025-06-19 00:03:18','2025-06-19 00:03:18'),('cef2f5cb-4ca0-11f0-bf06-a2aa668fea34','cee2a580-4ca0-11f0-bf06-a2aa668fea34','note','Strategy Planning','Prepared enterprise strategy document and roadmap','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef2fe68-4ca0-11f0-bf06-a2aa668fea34','cee2a580-4ca0-11f0-bf06-a2aa668fea34','email','Meeting Preparation','Sent strategy documents and market analysis','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef30009-4ca0-11f0-bf06-a2aa668fea34','cee2af17-4ca0-11f0-bf06-a2aa668fea34','note','Feature Requests','Compiled list of requested features and enhancements','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef30140-4ca0-11f0-bf06-a2aa668fea34','cee2af17-4ca0-11f0-bf06-a2aa668fea34','email','Product Roadmap','Sent product roadmap and enhancement timeline','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef30212-4ca0-11f0-bf06-a2aa668fea34','cee2b120-4ca0-11f0-bf06-a2aa668fea34','note','Performance Metrics','Prepared Q2 performance metrics and analysis','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef302dd-4ca0-11f0-bf06-a2aa668fea34','cee2b120-4ca0-11f0-bf06-a2aa668fea34','email','Review Materials','Sent performance review materials and agenda','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef303b8-4ca0-11f0-bf06-a2aa668fea34','cee2b2e7-4ca0-11f0-bf06-a2aa668fea34','note','Progress Tracking','Updated implementation progress and milestones','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cef3049e-4ca0-11f0-bf06-a2aa668fea34','cee2b2e7-4ca0-11f0-bf06-a2aa668fea34','email','Status Report','Sent implementation status report and next steps','2025-06-19 00:03:19','2025-06-19 00:03:19');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_products`
--

DROP TABLE IF EXISTS `customer_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_products` (
  `id` varchar(36) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `status` enum('interested','in_progress','purchased','cancelled') DEFAULT 'interested',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_customer_product` (`customer_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `customer_products_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `customer_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_products`
--

LOCK TABLES `customer_products` WRITE;
/*!40000 ALTER TABLE `customer_products` DISABLE KEYS */;
INSERT INTO `customer_products` VALUES ('cdae81d9-4ca0-11f0-bf06-a2aa668fea34','cd876630-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae8956-4ca0-11f0-bf06-a2aa668fea34','cd876630-4ca0-11f0-bf06-a2aa668fea34','cd5514e9-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae8b02-4ca0-11f0-bf06-a2aa668fea34','cd876a35-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae8c0f-4ca0-11f0-bf06-a2aa668fea34','cd876a35-4ca0-11f0-bf06-a2aa668fea34','cd5515c8-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae8d22-4ca0-11f0-bf06-a2aa668fea34','cd876afe-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae8eb3-4ca0-11f0-bf06-a2aa668fea34','cd876afe-4ca0-11f0-bf06-a2aa668fea34','cd551538-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae8f9f-4ca0-11f0-bf06-a2aa668fea34','cd876c1a-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae9080-4ca0-11f0-bf06-a2aa668fea34','cd876c74-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','in_progress','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae9181-4ca0-11f0-bf06-a2aa668fea34','cd876cca-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae92b1-4ca0-11f0-bf06-a2aa668fea34','cd876d24-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','interested','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae939c-4ca0-11f0-bf06-a2aa668fea34','cd876dc3-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','interested','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae9498-4ca0-11f0-bf06-a2aa668fea34','cd876e17-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','in_progress','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdae9581-4ca0-11f0-bf06-a2aa668fea34','cd876e7b-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','interested','2025-06-19 00:03:17','2025-06-19 00:03:17'),('ceba8962-4ca0-11f0-bf06-a2aa668fea34','cea66d85-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba91a5-4ca0-11f0-bf06-a2aa668fea34','cea66d85-4ca0-11f0-bf06-a2aa668fea34','ce76869c-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9327-4ca0-11f0-bf06-a2aa668fea34','cea67088-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba94d0-4ca0-11f0-bf06-a2aa668fea34','cea67088-4ca0-11f0-bf06-a2aa668fea34','cd5515c8-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9619-4ca0-11f0-bf06-a2aa668fea34','cea670e2-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9760-4ca0-11f0-bf06-a2aa668fea34','cea670e2-4ca0-11f0-bf06-a2aa668fea34','cd551538-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba989e-4ca0-11f0-bf06-a2aa668fea34','cea671eb-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba99d4-4ca0-11f0-bf06-a2aa668fea34','cea67221-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','in_progress','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9afe-4ca0-11f0-bf06-a2aa668fea34','cea67254-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','purchased','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9c2c-4ca0-11f0-bf06-a2aa668fea34','cea6728b-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','interested','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9d60-4ca0-11f0-bf06-a2aa668fea34','cea672f7-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','interested','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9e9e-4ca0-11f0-bf06-a2aa668fea34','cea6732c-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','in_progress','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ceba9fe0-4ca0-11f0-bf06-a2aa668fea34','cea67365-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','interested','2025-06-19 00:03:19','2025-06-19 00:03:19');
/*!40000 ALTER TABLE `customer_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `status` enum('lead','customer','inactive') DEFAULT 'lead',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  KEY `idx_customer_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('cd876630-4ca0-11f0-bf06-a2aa668fea34','John Smith','john.smith@techcorp.com','+1234567890','Tech Corp','customer','Main contact for enterprise solutions','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876a35-4ca0-11f0-bf06-a2aa668fea34','Sarah Johnson','sarah.j@innovate.com','+1987654321','Innovate Inc','customer','Enterprise client, multiple products','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876afe-4ca0-11f0-bf06-a2aa668fea34','Mike Brown','mike.b@global.com','+1122334455','Global Solutions','customer','Regular client, monthly meetings','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876b60-4ca0-11f0-bf06-a2aa668fea34','Emily Davis','emily.d@enterprise.com','+1555666777','Enterprise Solutions','customer','New enterprise client','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876bbb-4ca0-11f0-bf06-a2aa668fea34','David Wilson','david.w@mega.com','+1888999000','Mega Corp','customer','Strategic partner','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876c1a-4ca0-11f0-bf06-a2aa668fea34','Lisa Anderson','lisa.a@midtech.com','+1222333444','MidTech Solutions','customer','Growing business','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876c74-4ca0-11f0-bf06-a2aa668fea34','Robert Taylor','robert.t@medium.com','+1333444555','Medium Business Inc','customer','Expanding operations','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876cca-4ca0-11f0-bf06-a2aa668fea34','Maria Garcia','maria.g@techmid.com','+1444555666','TechMid Solutions','customer','New implementation','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876d24-4ca0-11f0-bf06-a2aa668fea34','James Wilson','james.w@midscale.com','+1555666777','MidScale Tech','customer','Regular updates needed','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876d71-4ca0-11f0-bf06-a2aa668fea34','Patricia Lee','patricia.l@midbiz.com','+1666777888','MidBiz Solutions','customer','Active user','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876dc3-4ca0-11f0-bf06-a2aa668fea34','Tom Harris','tom.h@smalltech.com','+1777888999','SmallTech','lead','Interested in basic package','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876e17-4ca0-11f0-bf06-a2aa668fea34','Anna White','anna.w@startup.com','+1888999000','Startup Solutions','lead','New business','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876e7b-4ca0-11f0-bf06-a2aa668fea34','Chris Martin','chris.m@smallbiz.com','+1999000111','SmallBiz Tech','lead','Budget conscious','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876ede-4ca0-11f0-bf06-a2aa668fea34','Rachel Green','rachel.g@techstart.com','+1000111222','TechStart','lead','Growing startup','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876f39-4ca0-11f0-bf06-a2aa668fea34','Daniel Kim','daniel.k@smallscale.com','+1111222333','SmallScale Solutions','lead','Evaluating options','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876f8e-4ca0-11f0-bf06-a2aa668fea34','Paul Black','paul.b@oldtech.com','+1222333444','OldTech Solutions','inactive','Switched to competitor','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd876fe4-4ca0-11f0-bf06-a2aa668fea34','Laura Chen','laura.c@former.com','+1333444555','Former Tech','inactive','Business closed','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd877038-4ca0-11f0-bf06-a2aa668fea34','Kevin Park','kevin.p@past.com','+1444555666','Past Solutions','inactive','No longer in business','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd87708a-4ca0-11f0-bf06-a2aa668fea34','Sophie Lee','sophie.l@oldbiz.com','+1555666777','OldBiz Tech','inactive','Merged with another company','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd8770e4-4ca0-11f0-bf06-a2aa668fea34','Ryan Wong','ryan.w@formerbiz.com','+1666777888','FormerBiz Solutions','inactive','Changed business focus','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cea66d85-4ca0-11f0-bf06-a2aa668fea34','Alex Thompson','alex.t@enterprise.com','+1234567891','Enterprise Tech','customer','Strategic enterprise client','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67088-4ca0-11f0-bf06-a2aa668fea34','Emma Wilson','emma.w@enterprise.com','+1234567892','Enterprise Solutions','customer','Global operations','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea670e2-4ca0-11f0-bf06-a2aa668fea34','Michael Brown','michael.b@enterprise.com','+1234567893','Enterprise Systems','customer','Multiple locations','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67123-4ca0-11f0-bf06-a2aa668fea34','Sophia Davis','sophia.d@enterprise.com','+1234567894','Enterprise Global','customer','International presence','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea671ab-4ca0-11f0-bf06-a2aa668fea34','William Johnson','william.j@enterprise.com','+1234567895','Enterprise Corp','customer','Industry leader','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea671eb-4ca0-11f0-bf06-a2aa668fea34','Olivia Martinez','olivia.m@midtech.com','+1234567896','MidTech Solutions','customer','Growing rapidly','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67221-4ca0-11f0-bf06-a2aa668fea34','James Anderson','james.a@midtech.com','+1234567897','MidTech Systems','customer','Expanding operations','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67254-4ca0-11f0-bf06-a2aa668fea34','Isabella Taylor','isabella.t@midtech.com','+1234567898','MidTech Global','customer','New markets','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea6728b-4ca0-11f0-bf06-a2aa668fea34','Benjamin White','benjamin.w@midtech.com','+1234567899','MidTech Corp','customer','Product development','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea672bf-4ca0-11f0-bf06-a2aa668fea34','Mia Garcia','mia.g@midtech.com','+1234567900','MidTech Solutions','customer','Service focus','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea672f7-4ca0-11f0-bf06-a2aa668fea34','Ethan Robinson','ethan.r@smalltech.com','+1234567901','SmallTech Solutions','lead','Startup phase','2025-06-19 00:03:19','2025-06-19 00:12:59'),('cea6732c-4ca0-11f0-bf06-a2aa668fea34','Charlotte Clark','charlotte.c@smalltech.com','+1234567902','SmallTech Systems','lead','Early stage','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67365-4ca0-11f0-bf06-a2aa668fea34','Lucas Rodriguez','lucas.r@smalltech.com','+1234567903','SmallTech Global','lead','Market research','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea6739e-4ca0-11f0-bf06-a2aa668fea34','Amelia Lewis','amelia.l@smalltech.com','+1234567904','SmallTech Corp','lead','Product launch','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea673d5-4ca0-11f0-bf06-a2aa668fea34','Mason Lee','mason.l@smalltech.com','+1234567905','SmallTech Solutions','lead','Customer acquisition','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67407-4ca0-11f0-bf06-a2aa668fea34','Harper Walker','harper.w@oldtech.com','+1234567906','OldTech Solutions','inactive','Business restructuring','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67442-4ca0-11f0-bf06-a2aa668fea34','Evelyn Hall','evelyn.h@oldtech.com','+1234567907','OldTech Systems','inactive','Market exit','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea67479-4ca0-11f0-bf06-a2aa668fea34','Abigail Allen','abigail.a@oldtech.com','+1234567908','OldTech Global','inactive','Acquisition','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea674ad-4ca0-11f0-bf06-a2aa668fea34','Elijah Young','elijah.y@oldtech.com','+1234567909','OldTech Corp','inactive','Business closure','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cea674e3-4ca0-11f0-bf06-a2aa668fea34','Elizabeth King','elizabeth.k@oldtech.com','+1234567910','OldTech Solutions','inactive','Industry change','2025-06-19 00:03:19','2025-06-19 00:03:19');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS `interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interactions` (
  `id` varchar(36) NOT NULL,
  `customer_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `type` enum('call','email','meeting','note') NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL,
  `status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customer_id` (`customer_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_type` (`type`),
  KEY `idx_interaction_date` (`date`),
  KEY `idx_interaction_status` (`status`),
  CONSTRAINT `interactions_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `interactions_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

LOCK TABLES `interactions` WRITE;
/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
INSERT INTO `interactions` VALUES ('cdcb7adf-4ca0-11f0-bf06-a2aa668fea34','cd876630-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','meeting','Q4 2024 Review Meeting','2024-12-15 10:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb84cc-4ca0-11f0-bf06-a2aa668fea34','cd876a35-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','call','Year-end Support Call','2024-12-20 14:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb87a6-4ca0-11f0-bf06-a2aa668fea34','cd876afe-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','meeting','Q1 2025 Strategy Meeting','2025-01-10 09:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb8acd-4ca0-11f0-bf06-a2aa668fea34','cd876c1a-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','meeting','Implementation Review','2025-01-15 11:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb8cdc-4ca0-11f0-bf06-a2aa668fea34','cd876c74-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','call','Onboarding Call','2025-01-20 15:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb8ed8-4ca0-11f0-bf06-a2aa668fea34','cd876cca-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','meeting','Q2 2025 Review','2025-04-05 10:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb9177-4ca0-11f0-bf06-a2aa668fea34','cd876d24-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','meeting','Feature Update Discussion','2025-04-15 14:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb94a2-4ca0-11f0-bf06-a2aa668fea34','cd876dc3-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','call','Product Demo','2025-07-10 11:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb972b-4ca0-11f0-bf06-a2aa668fea34','cd876e17-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','meeting','Implementation Planning','2025-07-20 13:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cdcb9917-4ca0-11f0-bf06-a2aa668fea34','cd876e7b-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','meeting','Year-end Review','2025-12-15 10:00:00','scheduled','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cee2a580-4ca0-11f0-bf06-a2aa668fea34','cea66d85-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','meeting','Enterprise Strategy Review','2025-01-25 10:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2af17-4ca0-11f0-bf06-a2aa668fea34','cea67088-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','call','Product Enhancement Discussion','2025-02-01 14:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2b120-4ca0-11f0-bf06-a2aa668fea34','cea670e2-4ca0-11f0-bf06-a2aa668fea34','cd551498-4ca0-11f0-bf06-a2aa668fea34','meeting','Q2 Performance Review','2025-04-20 09:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2b2e7-4ca0-11f0-bf06-a2aa668fea34','cea671eb-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','meeting','Implementation Progress','2025-05-05 11:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2b45e-4ca0-11f0-bf06-a2aa668fea34','cea67221-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','call','Feature Request Discussion','2025-07-15 15:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2b5d2-4ca0-11f0-bf06-a2aa668fea34','cea67254-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','meeting','Upgrade Planning','2025-08-01 13:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2b752-4ca0-11f0-bf06-a2aa668fea34','cea6728b-4ca0-11f0-bf06-a2aa668fea34','cd5513d6-4ca0-11f0-bf06-a2aa668fea34','meeting','Year-end Review','2025-12-10 10:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19'),('cee2b899-4ca0-11f0-bf06-a2aa668fea34','cea672f7-4ca0-11f0-bf06-a2aa668fea34','cd550fc7-4ca0-11f0-bf06-a2aa668fea34','call','Product Demo','2025-12-20 14:00:00','scheduled','2025-06-19 00:03:19','2025-06-19 00:03:19');
/*!40000 ALTER TABLE `interactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('cd550fc7-4ca0-11f0-bf06-a2aa668fea34','CRM Basic','Basic CRM features for small businesses',99.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd5513d6-4ca0-11f0-bf06-a2aa668fea34','CRM Pro','Advanced CRM features for medium businesses',199.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd551498-4ca0-11f0-bf06-a2aa668fea34','CRM Enterprise','Enterprise-level CRM solution',499.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd5514e9-4ca0-11f0-bf06-a2aa668fea34','CRM Support','24/7 Support package',49.99,'service','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd551538-4ca0-11f0-bf06-a2aa668fea34','CRM Training','On-site training package',299.99,'service','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd551583-4ca0-11f0-bf06-a2aa668fea34','CRM Mobile','Mobile app for CRM access',79.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd5515c8-4ca0-11f0-bf06-a2aa668fea34','CRM Analytics','Advanced analytics and reporting',149.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd55160f-4ca0-11f0-bf06-a2aa668fea34','CRM Integration','API and third-party integrations',199.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd551658-4ca0-11f0-bf06-a2aa668fea34','CRM Security','Enhanced security features',99.99,'software','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd55169c-4ca0-11f0-bf06-a2aa668fea34','CRM Customization','Custom development services',399.99,'service','active','2025-06-19 00:03:17','2025-06-19 00:03:17'),('ce76869c-4ca0-11f0-bf06-a2aa668fea34','CRM AI Assistant','AI-powered customer service assistant',299.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768a5a-4ca0-11f0-bf06-a2aa668fea34','CRM Data Migration','Data migration and import services',199.99,'service','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768aaa-4ca0-11f0-bf06-a2aa668fea34','CRM Backup','Automated backup and recovery',79.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768ae3-4ca0-11f0-bf06-a2aa668fea34','CRM Compliance','GDPR and compliance tools',149.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768b0a-4ca0-11f0-bf06-a2aa668fea34','CRM Workflow','Custom workflow automation',249.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768b35-4ca0-11f0-bf06-a2aa668fea34','CRM API Access','Advanced API access package',399.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768b63-4ca0-11f0-bf06-a2aa668fea34','CRM Multi-tenant','Multi-tenant deployment solution',599.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768b8e-4ca0-11f0-bf06-a2aa668fea34','CRM White Label','White label solution',499.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768bb5-4ca0-11f0-bf06-a2aa668fea34','CRM On-premise','On-premise deployment package',799.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce768be0-4ca0-11f0-bf06-a2aa668fea34','CRM Cloud','Cloud deployment package',299.99,'software','active','2025-06-19 00:03:19','2025-06-19 00:03:19');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `role` enum('admin','sales','support') DEFAULT 'sales',
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('18299051-6117-4999-9503-57c34a712773','Quang','hailoaidientich@gmail.com','$2a$10$TyZ6EzMMhvw2eLhweF.NsOupsfLnPZKpqvCqiBvi2/E6kRhNKzeC.','highschool','sales',NULL,'2025-06-19 00:41:09','2025-06-19 00:41:09'),('cd6f1f30-4ca0-11f0-bf06-a2aa668fea34','Admin User','admin@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Company','admin',NULL,'2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd6f218c-4ca0-11f0-bf06-a2aa668fea34','Sales Manager','sales@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Company','sales',NULL,'2025-06-19 00:03:17','2025-06-19 00:03:17'),('cd6f2221-4ca0-11f0-bf06-a2aa668fea34','Support Agent','support@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Company','support',NULL,'2025-06-19 00:03:17','2025-06-19 00:03:17'),('ce83a8e0-4ca0-11f0-bf06-a2aa668fea34','John Manager','john.m@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Solutions','admin',NULL,'2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce83ab98-4ca0-11f0-bf06-a2aa668fea34','Sarah Sales','sarah.s@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Solutions','sales',NULL,'2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce83ac15-4ca0-11f0-bf06-a2aa668fea34','Mike Support','mike.s@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Solutions','support',NULL,'2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce83ac48-4ca0-11f0-bf06-a2aa668fea34','Emily Admin','emily.a@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Solutions','admin',NULL,'2025-06-19 00:03:19','2025-06-19 00:03:19'),('ce83ac81-4ca0-11f0-bf06-a2aa668fea34','David Sales','david.s@crm.com','$2a$10$rOJMlhqG.gNKqJf8LhCj7.CWNaQdJp4XKGjLJZJlJjJkQwlJJlqJ2','CRM Solutions','sales',NULL,'2025-06-19 00:03:19','2025-06-19 00:03:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crm_system'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19 10:19:40
