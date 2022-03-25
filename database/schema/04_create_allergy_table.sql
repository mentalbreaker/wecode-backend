-- create allergy table

CREATE TABLE allergies(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
);