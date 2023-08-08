CREATE TABLE buyers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    gender INT NOT NULL, -- 0 or 1
    email VARCHAR(320) NOT NULL,
    phone_number VARCHAR(10),
    password VARCHAR(50) NOT NULL,

    local_address VARCHAR(40) NOT NULL,
    city VARCHAR(40) NOT NULL,
    state VARCHAR(40) NOT NULL,
    address VARCHAR(500) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    ratings FLOAT NOT NULL,
    images_dir VARCHAR(60),
    about_item_joined VARCHAR(500),
    category VARCHAR(50) NOT NULL,
    sub_category VARCHAR(50) NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE products_reviews (
    id INT NOT NULL AUTO_INCREMENT,
    one_star INT NOT NULL,
    two_star INT NOT NULL,
    three_star INT NOT NULL,
    four_star INT NOT NULL,
    five_star INT NOT NULL,
    avg_review FLOAT NOT NULL,

    PRIMARY KEY(id),
    product_id INT REFERENCES products(id)
);

CREATE TABLE cart_products (
    id INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY(id),
    buyer_id INT REFERENCES buyers(id),
    product_id INT REFERENCES products(id)
);

CREATE TABLE buy_products(
    id INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY(id),
    buyer_id INT REFERENCES buyers(id),
    product_id INT REFERENCES products(id)
);