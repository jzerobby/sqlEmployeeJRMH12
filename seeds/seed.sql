USE employee_db;
INSERT INTO department (name) VALUES
("production"),
("warehouse");
INSERT INTO role (title, salary, department_id) VALUES
("web developer", 20, 2), ("instructor", 40, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES
("Robby", "Makiling", 1, 2), ('Jay', "Alipio", 1, 1);