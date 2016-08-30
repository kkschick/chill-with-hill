CHILL WITH HILL
===============

####The Project

This project has a Flask server on the back-end and a Node server on the front-end
(using Webpack, React, Redux, and Babel + ES6). Here are the steps to get it all
set up!

####Back-end setup:

Get Postgres running and dump `data.pgdump` into a new database.

Create & activate your virtual env:

`$ virtualenv venv`

`$ . venv/bin/activate`

Install dependencies:

`(venv)$ pip install -r requirements.txt`

Start the Flask server:

`(venv)$ python server/app.py`


####Front-end setup:

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
