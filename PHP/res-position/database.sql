USE `misc`;

/*Table structure for table `position` */

DROP TABLE IF EXISTS `position`;

CREATE TABLE `position` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `profile_id` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`position_id`),
  KEY `position_ibfk_1` (`profile_id`),
  CONSTRAINT `position_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `position` */

/*Table structure for table `profile` */

DROP TABLE IF EXISTS `profile`;

CREATE TABLE `profile` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` text,
  `last_name` text,
  `email` text,
  `headline` text,
  `summary` text,
  PRIMARY KEY (`profile_id`),
  KEY `profile_ibfk_2` (`user_id`),
  CONSTRAINT `profile_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `profile` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `PASSWORD` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `email` (`email`),
  KEY `PASSWORD` (`PASSWORD`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `users` */

insert  into `users`(`user_id`,`NAME`,`email`,`PASSWORD`) values 
(1,'UMSI','umsi@umich.edu','1a52e17fa899cf40fb04cfc42e6352f1');