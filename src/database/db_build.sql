BEGIN;

DROP TABLE IF EXISTS users, items, loans, active_sessions CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    fav_colour VARCHAR(6),
    password_hash VARCHAR(60) NOT NULL
);

INSERT INTO users (name, email, fav_colour, password_hash) VALUES
    ('Sangita Sunuwar', 'sangita@gmail.com', '800080', '$2b$12$tAq9f9q4sVQhZ7JwVarYtuh7dZNOzGz.EN/VHiHDo7A2Vm/yHy3/e'),
    ('Dominic Coelho', 'domwork@live.com', '91a3b0', '$2b$12$9KMMDuR2Le5n1.tl1LYqOuVCRXjwpIRfj0RafQa/mppqgNTD7.P8u');

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    lender_id INTEGER REFERENCES users(id) NOT NULL,
    on_loan BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO items (name, description, lender_id, on_loan) VALUES
    ('Knife', 'Sharp blade!', 2, TRUE),
    ('Lawnmower', 'Sharp blades!', 1, TRUE),
    ('Shovel', 'Good for hiding bodies', 1, FALSE),
    ('Cake', 'Eat it soon', 2, TRUE),
    ('White chocolate', 'Disgusting', 2, FALSE);

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

CREATE TABLE active_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(80) REFERENCES users(email) NOT NULL,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- NEED TO INSERT DUMMY DATA INTO sessions TABLE

COMMIT;
