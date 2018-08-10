# DJES

## See it live here: 
https://sleepy-beyond-95793.herokuapp.com/

## How to set up and see the magic
1. Clone repo
2. Run `psql` or `pgcli` on your command line
3. `CREATE DATABASE toolshare;`
4. `CREATE USER sunuwars WITH SUPERUSER PASSWORD 'sunuwars123';`
5. `ALTER DATABASE toolshare OWNER TO sunuwars;`

INSTEAD OF steps 2 to 5, another option is to do this:
`createdb toolshare -O sunuwars`
(or `createdb toolshare –owner=sunuwars`)

6. Create `config.env` in the project's root directory
7. Copy `DB_URL = postgres://sunuwars:sunuwars123@localhost:5432/toolshare` into `config.env`
8. `npm run dev`
9. Go to `http://localhost:4002/`
10. ???
11. Profit

## What was the idea?
Inspired by one of our FAC fellows, Michael, we decided that we wanted to give FAC members the opportunity to borrow and lend items. 

Current functionality:
- user can search the database to see which items are listed
- user can request to borrow an item (request is added as an entry to the `loans` table)

Functionality we were so close to completing (the code does exist on the backend, so feel free to have a look):
- user can add an item for borrowing

Functionality we were less close to completing:
- user can narrow their search to available items (i.e. items not currently loaned out)
