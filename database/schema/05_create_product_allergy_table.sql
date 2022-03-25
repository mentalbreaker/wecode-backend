-- create product-allergy table 

CREATE TABLE products_allergies(
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT,
    allergy_id INT,
    created_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (allergy_id) REFERENCES allergies (id)
);