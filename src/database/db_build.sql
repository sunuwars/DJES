BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    fav_colour VARCHAR(6) NOT NULL
);

INSERT INTO users (name, email, fav_colour) VALUES 
    ('Sangita Sunuwar', 'sangita@gmail.com', '800080'),
    ('Dominic Coelho', 'domwork@live.com', '91a3b0');

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    lender_id INTEGER REFERENCES users (id) NOT NULL
);

INSERT INTO items (name, description, lender_id) VALUES 
    ('Knife', 'Sharp blade!', 2),
    ('Lawnmower', 'Sharp blades!', 1);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items (id) NOT NULL,
    borrowers_id INTEGER REFERENCES users (id) NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE
);

INSERT INTO items (item_id, borrowers_id) VALUES 
    (1, 1);

INSERT INTO items (item_id, borrowers_id, issue_date) VALUES 
    (2, 2, '2018-07-08');

COMMIT;