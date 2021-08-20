DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    department_name VARCHAR(40) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON DELETE SET NULL
);

-- database seeder
INSERT INTO department (department_name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");
   

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),          -- 1
    ("Sales Person", 80000, 1),         -- 2
    ("Lead Engineer", 150000, 2),       -- 3
    ("Software Engineer", 120000, 2),   -- 4
    ("Account Manager", 160000, 3),     -- 5
    ("Accountant", 125000, 3),          -- 6
    ("Legal Team Lead", 250000, 4),     -- 7
    ("Lawyer", 190000, 4);              -- 8


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, 1), 
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodrigeuz", 3, 3),
    ("Kevin", "Tupik", 4, 3),
    ("Kunal", "Singh", 5, 5), 
    ("Malia", "Brown", 6, 5),
    ("Sarah", "Lourd", 7, 7),
    ("Tom", "Allen", 8, 7);