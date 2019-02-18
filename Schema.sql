DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	id INT NOT NULL auto_increment,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INTEGER(255),
    PRIMARY KEY (id)
);
