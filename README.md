# Titan Application

## Overview
This application provides an interface to manage orders. It connects to a MySQL database to store and retrieve order details.

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:



2. Install Dependencies
Navigate to the project directory and install the required Node.js packages:

bash
Copy code
npm install
3. Set Up MySQL Database
3.1. Create Database Schema
You need to create a database named titan. You can do this by connecting to your MySQL server using a client (e.g., MySQL Workbench, phpMyAdmin, or command line) and running the following SQL command:

CREATE DATABASE titan;

3.2. Create Stored Procedures
After creating the database, switch to it and create the required stored procedures. Run the following SQL commands in your MySQL client:

USE titan;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateOrder`(
    IN p_email VARCHAR(255),
    IN p_full_name VARCHAR(255),
    IN p_full_address TEXT,
    IN p_image_urls JSON,
    IN p_frame_color VARCHAR(50),
    IN p_user VARCHAR(255),
    OUT p_order_id INT
)
BEGIN
    INSERT INTO orders (email, full_name, full_address, image_urls, frame_color, user)
    VALUES (p_email, p_full_name, p_full_address, p_image_urls, p_frame_color, p_user);
    
    SET p_order_id = LAST_INSERT_ID();
END$$

DELIMITER ;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserOrders`(IN p_user VARCHAR(255))
BEGIN
    SELECT 
        email,
        full_name,
        full_address,
        image_urls,
        frame_color,
        user
    FROM 
        orders
    WHERE 
        user = p_user;
END$$

DELIMITER ;


In the root of your project, update the .env file and add your database configuration details


run:  npm run start


