-- 01_create_category_table.sql ('--'는 주석을 나타냅니다.)

-- create category table
CREATE TABLE categories
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  created_at DATETIME DEFAULT NOW(),
  PRIMARY KEY (id)
);