USE EmployeeTrackerDB;


-- department:

INSERT INTO EmployeeTrackerDB.department
    ( name)
VALUES
    ('Business Office');
INSERT INTO EmployeeTrackerDB.department
    ( name)
VALUES
    ('Human Resources');
INSERT INTO EmployeeTrackerDB.department
    ( name)
VALUES
    ('Finance');

-- role:

INSERT INTO EmployeeTrackerDB.role
    (title, salary, department_id)
VALUES
    ('CAO', 100000.00, 1);
INSERT INTO EmployeeTrackerDB.role
    (title, salary, department_id)
VALUES
    ('COO', 80000.00, 2);
INSERT INTO EmployeeTrackerDB.role
    (title, salary, department_id)
VALUES
    ('CFO', 80000.00, 3);



-- employee

INSERT INTO EmployeeTrackerDB.employee
    (first_name,last_name,role_id,manager_id)
VALUES
    ('Martin', 'Funches', 1, NULL);
INSERT INTO EmployeeTrackerDB.employee
    (first_name,last_name,role_id,manager_id)
VALUES
    ('Tryphenia', 'Funches', 2, 1);
INSERT INTO EmployeeTrackerDB.employee
    (first_name,last_name,role_id,manager_id)
VALUES
    ('Joe', 'Funches', 3, 1);









