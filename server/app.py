import os
from flask import Flask, send_file, Blueprint
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)

def create_app():
    from api import events_api

    # **NOTE: This should probably be moved to a config file, but this is fine
    # for these purposes.
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql:///vagrant')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    app.register_blueprint(events_api.blueprint, url_prefix='/api')

    db.init_app(app)
    return app

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
