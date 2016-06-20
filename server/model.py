from delorean import Delorean
import pytz

from app import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    description = db.Column(db.String)
    official = db.Column(db.Boolean)
    visibility = db.Column(db.String)
    guests_can_invite_others = db.Column(db.Boolean)
    modified_date = db.Column(db.DateTime)
    created_date = db.Column(db.DateTime)
    participant_count = db.Column(db.Integer)
    reason_for_private = db.Column(db.String)
    order_email_template = db.Column(db.String)
    name = db.Column(db.String)
    locations = db.relationship('Location', backref='events', uselist=False)
    # **NOTE: I am assuming that each event only has one location.

    @classmethod
    def get_all_confirmed_public_events(self):
        """ Get all confirmed, public events. 
            **NOTE: I'm assuming that a status of 'confirmed'
            means the event was confirmed by the host and that
            a visibility of 'public' means the event is open to
            the public.
        """

        return self.query.filter_by(
            status='confirmed',
            visibility='public'
        ).all()

    @classmethod
    def get_event_by_id(self, event_id):
        """ Get event object by its id. """

        return self.query.filter_by(id=event_id).first()

    @staticmethod
    def format_datetime(dt_obj, timezone='UTC', is_dst=None):
        """ Add timezone information to datetime objects, shift to UTC,
            and convert to epoch time.
        """

        # If datetime object has a timezone, use that; otherwise
        # use whatever was passed in (default to UTC).
        timezone = dt_obj.tzinfo or timezone
        try:
            timezone = pytz.timezone(timezone)
        except AttributeError:
            pass

        # Convert datetime to the specified timezone, and then shift to UTC
        delorean_time = Delorean(timezone.localize(dt_obj, is_dst=is_dst))
        delorean_time = delorean_time.shift('UTC')
        return delorean_time.epoch # Convert datetime to unix timestamp

class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    address_type = db.Column(db.String)
    contact_phone = db.Column(db.String)
    primary = db.Column(db.Boolean)
    contact_email = db.Column(db.String)
    contact_family_name = db.Column(db.String)
    contact_given_name = db.Column(db.String)
    host_given_name = db.Column(db.String)
    timezone = db.Column(db.String)
    city = db.Column(db.String)
    locality = db.Column(db.String)
    state = db.Column(db.String)
    address_type = db.Column(db.String)
    latitude = db.Column(db.String)
    longitude = db.Column(db.String)
    accuracy = db.Column(db.String)
    address1 = db.Column(db.String)
    address2 = db.Column(db.String)
    postal_code = db.Column(db.String)
    country = db.Column(db.String)
    modified_date = db.Column(db.DateTime)
    created_date = db.Column(db.DateTime)
    number_spaces_remaining = db.Column(db.Numeric)
    spaces_remaining = db.Column(db.Boolean)
    name = db.Column(db.String)
