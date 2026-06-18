USE `misc`;

/*Table structure for table `education` */

DROP TABLE IF EXISTS `education`;

CREATE TABLE `education` (
  `profile_id` int NOT NULL,
  `institution_id` int NOT NULL,
  `rank` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`profile_id`,`institution_id`),
  KEY `education_ibfk_2` (`institution_id`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `education_ibfk_2` FOREIGN KEY (`institution_id`) REFERENCES `institution` (`institution_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `education` */

/*Table structure for table `institution` */

DROP TABLE IF EXISTS `institution`;

CREATE TABLE `institution` (
  `institution_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`institution_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

/*Data for the table `institution` */

insert  into `institution`(`institution_id`,`name`) values 
(6,'Duke University'),
(7,'Michigan State University'),
(8,'Mississippi State University'),
(9,'Montana State University'),
(5,'Stanford University'),
(4,'University of Cambridge'),
(1,'University of Michigan'),
(3,'University of Oxford'),
(2,'University of Virginia');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

/*Data for the table `profile` */

insert  into `profile`(`profile_id`,`user_id`,`first_name`,`last_name`,`email`,`headline`,`summary`) values 
(1,1,'Luffa','Dejection','blah@example.com','Confronted','Arraigned'),
(2,1,'Ascend','Dehydrate','blah@example.com','Moggies','Oxcart'),
(3,1,'Ceilings','Encoignure','blah@example.com','Fumarolic','Resumable'),
(4,1,'Abscissae','Pewits','blah@example.com','Antivenin','Downtrend'),
(5,1,'Screened','Betrayer','blah@example.com','Spooniest','Tompons');

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