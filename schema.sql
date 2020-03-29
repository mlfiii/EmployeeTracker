-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS EmployeeTrackerDB;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE EmployeeTrackerDB;

USE EmployeeTrackerDB;

-- Create the table tasks.

-- department:
-- id - INT PRIMARY KEY
-- name - VARCHAR(30) to hold department name
CREATE TABLE department
(
    id int NOT NULL
    AUTO_INCREMENT,
  name varchar
    (255) NOT NULL,
  PRIMARY KEY
    (id)
);

    -- role:
    -- id - INT PRIMARY KEY
    -- title -  VARCHAR(30) to hold role title
    -- salary -  DECIMAL to hold role salary
    -- department_id -  INT to hold reference to department role belongs to

    CREATE TABLE role
    (
        id int NOT NULL
        AUTO_INCREMENT,
  title varchar
        (30) NOT NULL,
  salary decimal
        (10,2),
  department_id INT,
  PRIMARY KEY
        (id),
    FOREIGN KEY
        (department_id) REFERENCES department
        (id)
);

        -- employee
        -- id - INT PRIMARY KEY
        -- first_name - VARCHAR(30) to hold employee first name
        -- last_name - VARCHAR(30) to hold employee last name
        -- role_id - INT to hold reference to role employee has
        -- manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
  first_name varchar
            (30) NOT NULL,
  last_name varchar
            (30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY
            (id),
    FOREIGN KEY
            (role_id) REFERENCES role
            (id)
);








