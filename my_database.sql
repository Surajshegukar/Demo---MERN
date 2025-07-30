-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2025 at 10:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admins`
--

CREATE TABLE `tbl_admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_admins`
--

INSERT INTO `tbl_admins` (`id`, `name`, `email`, `password`, `status`, `is_deleted`, `created_on`, `updated_on`) VALUES
(1, 'suraj shegukar', 'surajshegukar2732@gmail.com', '$2b$10$HfCv/JeeEUo883HEMQzxAuvsqy8dYImMJ8dCEkyL3MFGQmxRl2pf6', '1', '0', '2025-06-28 07:20:12', '2025-06-28 07:20:12'),
(2, 'suraj', 'surajshegukar273@gmail.com', '$2b$10$ktepd6lBnZD1Wruknv9Ze.md9NBLsMmuQ2rJSkgM08gH49YbtB9Iq', '1', '0', '2025-06-28 07:30:22', '2025-06-28 07:30:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_description` varchar(255) NOT NULL,
  `service_img` text DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `service_name`, `service_description`, `service_img`, `status`, `is_deleted`, `created_on`, `updated_on`) VALUES
(32, 'Service 1', 'Service descrption', NULL, '1', '1', '2025-06-29 18:11:53', '2025-07-23 19:02:25'),
(33, 'serv', 'serv', 'guest-compressed_image-2025-07-06T13-07-35-592Z-c856d245-a753-4731-9881-35422ff434f7.jpeg', '1', '1', '2025-07-06 13:07:35', '2025-07-23 19:06:06'),
(40, 'hhvgvg', 'nn b n', 'guest-compressed_image-(1)-2025-07-21T18-56-49-222Z-882903aa-4870-4fad-8199-3aef39d4d76a.jpeg', '1', '1', '2025-07-21 18:56:49', '2025-07-23 18:59:26'),
(41, 'ABC', 'sdasdasd', 'guest-bookmark-2025-07-28T18-18-58-256Z-7be22d5b-3622-4927-8879-b876f0a7b9ce.png', '1', '1', '2025-07-28 18:14:59', '2025-07-29 17:42:42'),
(42, 'Service 1', 'Service Desciption', 'guest-ab8bff-2025-07-29T17-44-28-310Z-c2673647-2ced-4aed-8ac3-3132372a28c6.png', '0', '1', '2025-07-29 17:44:28', '2025-07-29 18:33:47');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_students`
--

CREATE TABLE `tbl_students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_students`
--

INSERT INTO `tbl_students` (`id`, `first_name`, `last_name`, `dob`, `profile`, `email`, `mobile_no`, `address`, `status`, `is_deleted`, `created_on`, `updated_on`) VALUES
(29, 'Suraj', 'Shegukar', '2025-06-28', '1751140030647-compressed_image.jpeg', 'surajshegukar2732@gmail.com', '09021434751', 'Front of St.Agustine Pre-Primary School, Post Colony, Old Pedagaon Road, Parbhani', '1', '0', '2025-06-28 19:47:10', '2025-06-28 19:47:10'),
(30, 'John', 'Doe', '2002-01-01', '1751140119274-Proposed architechture.png', 'johndoe@gmail.com', '1122332212', 'ABC,State,country', '1', '0', '2025-06-28 19:48:39', '2025-06-28 19:48:39'),
(31, 'Jane', 'Doe', '1222-10-09', '1751182430909-compressed_image.jpeg', 'janedoe@example.com', '1231231231', 'New York, USA', '1', '0', '2025-06-29 07:33:51', '2025-06-29 07:33:51'),
(34, 'Suraj', 'Shegukar', '2025-07-01', '1751828397885-_Cherry Blossom Encounter_.jpg', 'surajsheguka123r2732@gmail.com', '09021434751', 'Front of St.Agustine Pre-Primary School, Post Colony, Old Pedagaon Road, Parbhani', '1', '0', '2025-07-06 18:59:58', '2025-07-06 19:00:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(3, 'hello', 'hellow@gmail.com', '123123123@123Sda', '2025-06-25 18:10:47', '2025-06-25 18:10:47'),
(4, 'Suraj Shegukar', 'surajshegukar2732@gmail.com', '$2b$10$06KRAtHhrqs8qOAeVC4YD.1n72Dx.ZFfqtsq4GTEHoMZvmylkC/vS', '2025-06-28 07:06:56', '2025-06-28 07:06:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admins`
--
ALTER TABLE `tbl_admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_students`
--
ALTER TABLE `tbl_students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admins`
--
ALTER TABLE `tbl_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `tbl_students`
--
ALTER TABLE `tbl_students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
