-- Database: geogenius_db

-- Table: city
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lng` decimal(11,8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `city` (`id`, `name`, `lat`, `lng`) VALUES 
(1,'Washington D.C',38.89425000,-77.03965000),
(2,'San Antonio',29.42430900,-98.49467900),
(3,'Rio de Janeiro',-22.95191600,-43.21048700),
(4,'Sichuan',30.65090000,104.07570000),
(5,'Paris',48.85840000,2.29450000),
(6,'Cairo',29.97920000,31.13420000),
(7,'Minneapolis',44.97780000,-93.26500000),
(8,'Mexico City',19.43260000,-99.13320000),
(9,'Tokyo',35.67640000,139.65000000);

-- Table: question
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(250) NOT NULL,
  `answer` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `question` (`id`, `text`, `answer`) VALUES 
(1,'What city is the White House Located?',1),
(2,'Do you remember the Alamo?',2),
(3,'In what city is Christ the Redeemer?',3),
(4,'What province is known for its bold, spicy, and numbing cuisine?',4),
(5,'What city has the Eiffel Tower?',5),
(6,'What city has the Great Pyramids of Giza?',6),
(7,'What is the capital city of Minnesota?',7),
(8,'What city was built over the Aztec City of Tenochtitlan?',8),
(9,'Which of these places was once called Edo?',9);

-- Table: user
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `score` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
