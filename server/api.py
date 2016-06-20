from flask import Blueprint
from flask_restful import Api, Resource

events_api = Api(Blueprint('events_api', __name__))

@events_api.resource('/events')
class Events(Resource):
    @staticmethod
    def get():
        """ Get list of all confirmed, public events. 
            **NOTE: I am assuming we only want to show events that are
            open to the public and are confirmed. I also made assumptions
            about which information was useful to display and have

            **NOTE: Also, if I had more time, I would have run a migration
            to convert all datetime objects to UTC. The `format_datetime`
            method definitely slows this loop down, and that could be a
            problem for scaling.

            **NOTE: Also also, if performance became an issue due to number
            of events, I would batch this endpoint to only return n events
            per XHR.
        """
        from model import Event

        events = Event.get_all_confirmed_public_events()

        return [{
            'id': event.id,
            'name': event.name,
            'description': event.description,
            # **NOTE: I am assuming that the timezone in the locations table is the timezone of
            # the event. This manipulation here takes the datetime, adds the appropriate timezone,
            # shifts the datetime to UTC to standardize it, and converts it to a unix timestamp.
            # Ideally this would all be stored as UTC, though, so we can localize the time on the
            # client... but maybe it would have been fine to leave these times as is, and just
            # show the timezone on the client? I'm assuming we want to localize these times, though.
            'start': event.format_datetime(event.start_date, timezone=event.locations.timezone),
            'end': event.format_datetime(event.end_date, timezone=event.locations.timezone),
            'is_official': event.official,
            'participant_count': int(event.participant_count) if event.participant_count else 0,
            'are_spaces_remaining': event.locations.spaces_remaining,
            'location_name': event.locations.name,
            'address1': event.locations.address1,
            'address2': event.locations.address2,
            'city': event.locations.city,
            'state': event.locations.state,
            'postal_code': event.locations.postal_code,
            'contact_first_name': event.locations.contact_given_name,
            'contact_last_name': event.locations.contact_family_name,
            'contact_phone': event.locations.contact_phone,
            'contact_email': event.locations.contact_email,
            'host_name': event.locations.host_given_name
        } for event in events]

@events_api.resource('/rsvp/<int:event_id>')
class Rsvp(Resource):
    def put(self, event_id):
        """ RSVP to an event. """
        from app import db
        from model import Event

        event = Event.get_event_by_id(event_id)

        if event.locations.spaces_remaining:
            event.participant_count += 1

            # If the event has a capacity cap, subtract one from spaces remaining
            # **NOTE: I am assuming that if number_spaces_remaining is None, there
            # is no capacity cap.
            if event.locations.number_spaces_remaining:
                event.locations.number_spaces_remaining -= 1

                # If no spaces left, flip boolean
                if event.locations.number_spaces_remaining == 0:
                    event.locations.spaces_remaining = False

            db.session.add(event)
            db.session.commit()

            return [{
                'id': event.id,
                'participant_count': int(event.participant_count) if event.participant_count else 0,
                'are_spaces_remaining': event.locations.spaces_remaining,
            }]

        # Safeguard, but the front-end should not attempt the XHR
        # if the event is full 
        return { 'error': 'This event is already full!' }, 400

@events_api.resource('/unrsvp/<int:event_id>')
class UnRsvp(Resource):
    def put(self, event_id):
        """ Un-RSVP to an event. """
        from app import db
        from model import Event

        event = Event.get_event_by_id(event_id)

        if event.locations.spaces_remaining:
            if event.participant_count > 0:
                event.participant_count -=1

            # If the event has a capacity cap, subtract one from spaces remaining
            # **NOTE: I am assuming that if number_spaces_remaining is None, there
            # is no capacity cap.
            if event.locations.number_spaces_remaining:
                event.locations.number_spaces_remaining += 1

                # Flip boolean because now there are spots left again
                event.locations.spaces_remaining = True

            db.session.add(event)
            db.session.commit()

            return [{
                'id': event.id,
                'participant_count': int(event.participant_count) if event.participant_count else 0,
                'are_spaces_remaining': event.locations.spaces_remaining,
            }]

        return { 'error': 'Unable to process your RSVP. Please try again.' }, 400
