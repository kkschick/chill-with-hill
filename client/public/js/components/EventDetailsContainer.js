import React from 'react';
import { connect } from 'react-redux';

import EventDetails from './EventDetails';
import { getEvents, rsvpToEvent, unRsvpToEvent } from '../actions/eventActions';

class EventDetailsContainer extends React.Component {
  render() {
    return (
        <div className="event-details-container">
          <EventDetails
            eventId={this.props.params.id}
            events={this.props.events}
            errorMessage={this.props.errorMessage} // **NOTE: Not currently doing anything with this but would if more time.
            eventsAttending={this.props.eventsAttending}
            getEvents={() => this.props.onGetEvents()}
            rsvpToEvent={(evt) => this.props.onRsvpToEvent(evt)}
            unRsvpToEvent={(evt) => this.props.onUnRsvpToEvent(evt)}
          />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events.events,
    eventsAttending: state.events.eventsAttending
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetEvents: () => dispatch(getEvents()),
    onRsvpToEvent: (evt) => dispatch(rsvpToEvent(evt)),
    onUnRsvpToEvent: (evt) => dispatch(unRsvpToEvent(evt))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsContainer);
