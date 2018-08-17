# DJES

## See it live here: 
https://desolate-lake-72795.herokuapp.com/

You are  able to register as a new user. This will then automatically log you in and give you access to seeing which items you can lend and borrow.

In order to log in as an existing user, you can use:
sangita@gmail.com
password123

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
- user can register as a new user (they get a 12 hour cookie)
- user can log in (each time they log in we check for a cookie and the sessionid in the cookie)
- user can search the database to see which items are listed
- user can request to borrow an item (request is added as an entry to the `loans` table)
- user can add an item for borrowing

Functionality we are close to completing:
- user can narrow their search to available items (i.e. items not currently loaned out)

### Meeting the Requirements
+ [x] Login form with 2 fields - username and password *we decided to use their email address as their username since this worked better with the existing set up*
+ [x] Client-side _and_ server-side validation on login form, including error handling that provides feedback to users
+ [x] Users only have to log in once (i.e. implement a cookie-based session on login)
+ [ ] Username is visible on each page of the site after logging in
+ [x] Any user-submitted content should be labelled with the authors username *all items listed and borrowed is linked with that user's id*
+ [x] There should be protected routes and unprotected routes that depend on the user having a cookie or not (or what level of access they have).
+ [x] Website content should be stored in a database

### Some of the challenges we faced (and you'll no doubt see!)

- Callback hell! Building on existing code from last week meant we kept getting further into endless layers of callbacks (check out our handlers to see this in action). We did start implementing promises which was great but we would want to refactor the entire code into promises

