-- create imgUrl table

CREATE TABLE product_images
(
  id INT NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(3000) NOT NULL,
  product_id INT NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product (id)
);