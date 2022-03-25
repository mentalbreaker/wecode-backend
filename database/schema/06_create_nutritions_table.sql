-- create nutritions table 

CREATE TABLE nutritions(
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    caffein FLOAT,
    fat FLOAT,
    sugar FLOAT,
    sodium FLOAT,
    created_at DATETIME DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);