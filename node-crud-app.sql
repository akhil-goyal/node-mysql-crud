-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 26, 2021 at 08:32 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node-crud-app`
--
CREATE DATABASE IF NOT EXISTS `node-crud-app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `node-crud-app`;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `initial_price` decimal(10,0) NOT NULL,
  `final_price` decimal(10,0) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `initial_price`, `final_price`, `image`) VALUES
(10, 'String Of Pearls', 'What a unique houseplant! Guests are sure to comment on the grace of your beautiful Senecio rowleyanus as its delicate tendrils of round beads overflow its plante', '23', '22', 'image-1619468831590'),
(11, 'Peace Lilly', 'Sometimes flowering plants prove the most challenging to keep healthy, but certain lilies in the Spathiphyllum genus (the peace li', '12', '10', 'image-1619468858976'),
(12, 'Areca Palm', 'Dypsis lutescens, commonly known as golden cane palm or areca palm, makes a lovely focal point with its h', '14', '12', 'image-1619468888192'),
(13, 'Grafter Ficus Bonsai', 'Are you looking for a small desk plant sure to spark conversation? Ficus microcarpa “Ginseng” definitely has a very distinctive look to it.', '20', '18', 'image-1619468931806'),
(14, 'Calathea Orbifolia', 'Smooth streaks of white stand out against the vivid green leaves of the Calathea orbifolia, like a living painting. These plants are a li', '15', '13', 'image-1619468962121');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
