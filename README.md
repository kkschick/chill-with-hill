Chill With Hill
===============

##Table of Contents
- [The Project](#the-project)
- [Get It Running](#get-it-running)
- [Screenshots](#screenshots)

##The Project

This project has a Flask server on the back-end and a Node server on the front-end
(using Webpack, React, Redux, and Babel + ES6). Here are the steps to get it all
set up!


##Get It Running

###Back-end setup:

Get Postgres running and dump `data.pgdump` into a new database.

Create & activate your virtual env:

`$ virtualenv venv`

`$ . venv/bin/activate`

Install dependencies:

`(venv)$ pip install -r requirements.txt`

Start the Flask server:

`(venv)$ python server/app.py`


###Front-end setup:

If you don't already have npm, go ahead and install it:

`$ sudo apt-get install npm`

I was using node v4.4.3. To install that, run:

`$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`

`$ sudo apt-get install -y nodejs`

Check your version:

`$ node --version`

`v4.4.3`

Install dependencies:

`$ cd client/`

`$ npm install`

Start the node server:

`$ npm start`

Point your browser to `localhost:3000`.


##Screenshots

View events:

![View events](/screenshots/event_list.png)

RSVP:

![RSVP](/screenshots/event_details_rsvp.png)

Check your RSVP status or un-RSVP:

![RSVP check](/screenshots/event_details_attending.png)

See whether an event is full:

![Check full](/screenshots/event_details_full.png)
