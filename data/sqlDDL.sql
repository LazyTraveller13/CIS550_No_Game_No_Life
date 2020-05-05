CREATE TABLE Game (
    id INT(10),
    name VARCHAR(256) NOT NULL,
    release_year INT(4) NOT NULL,
    developer VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE Genre (
    name VARCHAR(256),
    PRIMARY KEY (name)
)

CREATE TABLE Game_genre (
    game_id INT(10),
    genre_name VARCHAR(256),
    PRIMARY KEY (id, genre_name),
    CONSTRAINT FOREIGN KEY game_id REFERENCES Game(id),
    CONSTRAINT FOREIGN KEY genre_name REFERENCES Genre(name)
)

CREATE TABLE Rating (
    id INT(10),
    user_rating DECIMAL(3, 1),
    website_rating DECIMAL(3, 1),
    PRIMARY KEY (id)
)

CREATE TABLE Platform (
    name VARCHAR(256),
    PRIMARY KEY (name)
)

CREATE TABLE Game_plat (
    game_id INT(10),
    plat_name VARCHAR(256),
    PRIMARY KEY (id, plat_name),
    CONSTRAINT FOREIGN KEY game_id REFERENCES Game(id),
    CONSTRAINT FOREIGN KEY plat_name REFERENCES Platform(name)
)


CREATE TABLE Classification (
    name VARCHAR(256),
    description VARCHAR(256),
    PRIMARY KEY (name)
)

CREATE TABLE Game_class (
    game_id INT(10),
    class_name VARCHAR(256),
    PRIMARY KEY (id, class_name),
    CONSTRAINT FOREIGN KEY game_id REFERENCES Game(id),
    CONSTRAINT FOREIGN KEY class_name REFERENCES Classification(name)
)

CREATE TABLE Website (
    id INT(10),
    vg_url VARCHAR(256),
    photo_url VARCHAR(256)
    PRIMARY KEY (id)
)

CREATE TABLE user_info (
    username VARCHAR(256),
    password VARCHAR(256),
    PRIMARY KEY (username) NOT NULL
)
