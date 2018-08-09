# DJES

1. Clone repo
2. Run `psql` or `pgcli` on your command line
3. `CREATE DATABASE toolshare;`
4. `CREATE USER sunuwars WITH SUPERUSER PASSWORD 'sunuwars123';`
5. `ALTER DATABASE toolshare OWNER TO sunuwars;`
6. Create `config.env` in the project's root directory
7. Copy `DB_URL = postgres://sunuwars:sunuwars123@localhost:5432/toolshare` into `config.env`
8. `npm run dev`
9. Go to `http://localhost:4002/`
10. ???
11. Profit

Current functionality:
- user can search the database to see which items are listed
- user can request to borrow an item (request is added as an entry to the `loans` table)

Functionality we were so close to completing:
- user can add an item for borrowing

Functionality we were less close to completing:
- user can narrow their search to available items (i.e. items not currently loaned out)
