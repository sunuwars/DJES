# DJES

## Heroku link
[See it on Heroku here!](https://desolate-lake-72795.herokuapp.com/)
The above link should be pretty up-to-date. See below for instructions on how to ensure you see the latest version.

You are  able to register as a new user. This will then automatically log you in and give you access to seeing which items you can lend and borrow.

We've given you (aka forgotten to remove) placeholder values for the registration making it super easy for you to register as a new user (well one of you anyway, because we do check for existing email address :) ), but definitely go ahead and delete them and test our our client side validation :)

In order to log in as an existing user, you can use:
sangita@gmail.com
password123

## How to set up and see the magic
1. Clone repo (make sure it's this FAC-14 one, not the Sunuwars one that we've forked!)
2. Run `psql` or `pgcli` on your command line
3. `CREATE DATABASE toolshare;`
4. `CREATE USER sunuwars WITH SUPERUSER PASSWORD 'sunuwars123';`
5. `ALTER DATABASE toolshare OWNER TO sunuwars;`

INSTEAD OF steps 2 to 5, another option is to do this:
`createdb toolshare -O sunuwars`
(or `createdb toolshare –owner=sunuwars`)

6. Create `config.env` in the project's root directory
7. Paste `DATABASE_URL = postgres://sunuwars:sunuwars123@localhost:5432/toolshare` into `config.env`
8. Create the local database tables: open the database with the login from `#7`, using `psql` or `pgcli`, and then paste in the contents of `db_build.sql` (press y to confirm destructive action).
9. `npm run dev`
10. Go to `http://localhost:4002/`
11. ???
12. Profit

## What was the idea?
Inspired by one of our FAC fellows, Michael, we decided that we wanted to give FAC members the opportunity to borrow and lend items. 

## Previous functionality:
Quoted from last week. Some of this functionality might not be there anymore. Let us know... :P
Current functionality:
- user can register as a new user (they get a 12 hour cookie)
- after registration/login, a random session ID is created and stored in our `active_sessions` table- user can search the database to see which items are listed
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
+ [ ] Website content should be stored in a database

### Some of the challenges we faced (and you'll no doubt see!)

**Known issue**
- Not at all mobile responsive. Very delicate layout/css as almost all time has been spent on back-end or front-end scripting rather than responsiveness, etc.

**Warnings**
- The code is a bit of a mess at some points. We definitely reached one of the circles of Callback Hell, and mixing-in promises with the callbacks has made things a bit more confusing.
- As mentioned above, it's not at all responsive. Please view on widescreen!

