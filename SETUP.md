CHILL WITH HILL
---------------

This project has a Flask server on the back-end and a Node server on the front-end
(using Webpack, React, Redux, and Babel + ES6). Here are the steps to get it all
set up. Please let me know if you run into any issues! (kkschick@gmail.com)

I've left a fair number of comments throughout the codebase and have prefaced the
more important ones with "**NOTE" if you want to grep specifically for that. I also
tried to leave notes to indicate what I'd do if I had more time (tl;dr: a lot). :)

BACK-END SET-UP:
If you don't already have virtualenv, go ahead and install it:
$ sudo apt-get install python-virtualenv

Create & activate your virtual env:
$ virtualenv venv
$ . venv/bin/activate

Install dependencies:
(venv)$ pip install -r requirements.txt

If you run into problems installing psycopg2, run this & try the install again:
(venv)$ sudo apt-get install libpq-dev python-dev
(venv)$ pip install -r requirements.txt

Start the Flask server:
(venv)$ python server/app.py


FRONT-END SET-UP:
If you don't already have npm, go ahead and install it:
$ sudo apt-get install npm

I was using node v4.4.3 and npm v2.15.1. To install that, run:
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs

Check your versions:
$ node --version
v4.4.3
$ npm --version
2.15.1

Install dependencies:
$ cd client/
$ npm install (**NOTE: This kept hanging on my VM, so I had more success running it on OSX. It might take a few mins to install all the deps.)

Start the node server:
$ npm start

Once you run npm start and it says "Listening at port 3000," point your browser at localhost:3000.
It will take about a minute for it to build (there will be a pause and then you'll get a bunch
of output in your console).
