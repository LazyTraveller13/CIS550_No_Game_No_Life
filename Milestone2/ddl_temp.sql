CREATE TABLE Game (
    id INT(5),
    name VARCHAR(20) NOT NULL,
    release_year INT(4) NOT NULL,
    developer VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE Genre (
    name VARCHAR(20),
    PRIMARY KEY (name)
)

CREATE TABLE Game_genre (
    game_id INT(5),
    genre_name VARCHAR(20),
    PRIMARY KEY (id, genre_name),
    CONSTRAINT FOREIGN KEY game_id REFERENCES Game(id),
    CONSTRAINT FOREIGN KEY genre_name REFERENCES Genre(name)
)

CREATE TABLE Rating (
    id INT(6),
    user_rating DECIMAL(3),
    website_rating DECIMAL(3),
    PRIMARY KEY (id)
)

CREATE TABLE Platform (
    name VARCHAR(20),
    PRIMARY KEY (name)
)

CREATE TABLE Game_plat (
    game_id INT(6),
    plat_name VARCHAR(20),
    PRIMARY KEY (id, plat_name),
    CONSTRAINT FOREIGN KEY game_id REFERENCES Game(id),
    CONSTRAINT FOREIGN KEY plat_name REFERENCES Platform(name)
)


CREATE TABLE Classification (
    name VARCHAR(20),
    description VARCHAR(256),
    PRIMARY KEY (name)
)

CREATE TABLE Game_class (
    game_id INT(6),
    class_name VARCHAR(20),
    PRIMARY KEY (id, class_name),
    CONSTRAINT FOREIGN KEY game_id REFERENCES Game(id),
    CONSTRAINT FOREIGN KEY class_name REFERENCES Classification(name)
)

CREATE TABLE Website (
    id INT(6),
    vg_url VARCHAR(256),
    photo_url VARCHAR(256)
    PRIMARY KEY (id)
)
