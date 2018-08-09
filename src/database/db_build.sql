BEGIN;

DROP TABLE IF EXISTS users, items, loans CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    fav_colour VARCHAR(6)
);

INSERT INTO users (name, email, fav_colour) VALUES
    ('Sangita Sunuwar', 'sangita@gmail.com', '800080'),
    ('Dominic Coelho', 'domwork@live.com', '91a3b0');

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    lender_id INTEGER REFERENCES users(id) NOT NULL
);

INSERT INTO items (name, description, lender_id) VALUES
    ('Knife', 'Sharp blade!', 2),
    ('Lawnmower', 'Sharp blades!', 1), 
    ('Shovel', 'Good for hiding bodies', 1), 
    ('Cake', 'Eat it soon', 2),
    ('White chocolate', 'Disgusting', 2);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    item_id INTEGER REFERENCES items(id) NOT NULL,
    borrowers_id INTEGER REFERENCES users(id) NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE
);

INSERT INTO loans (item_id, borrowers_id) VALUES
    (1, 1);

INSERT INTO loans (item_id, borrowers_id, issue_date) VALUES 
    (2, 2, '2018-08-07');

INSERT INTO loans (item_id, borrowers_id, issue_date, return_date) VALUES 
    (3, 2, '2018-08-05', '2018-08-08'), 
    (4, 1, '2018-08-05', '2018-08-06'), 
    (4, 1, '2018-08-07', NULL);

COMMIT;
