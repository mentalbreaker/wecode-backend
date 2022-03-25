-- 02_create_product_table.sql 

-- create product table
CREATE TABLE product
(
  id INT NOT NULL AUTO_INCREMENT,
  korean_name VARCHAR(200) NOT NULL UNIQUE,
  english_name VARCHAR(200),
  category_id int NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories (id)
);