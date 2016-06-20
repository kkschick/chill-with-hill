import _ from 'lodash';
import React from 'react';

import { formatDateAndLocation } from './helpers.js';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.eventObj = {};
  }

  componentDidMount() {
    if (!this.props.events || this.props.events.length === 0) {
      this.props.getEvents();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(this.eventObj) && nextProps.events.length > 0) {
      // Find selected event object & format just that object
      // **NOTE: If we keyed this by id, it would give a faster lookup.
      // It's fine now, but if we had thousands of objects, we'd probably
      // want to change this to be keyed by id.
      let events = nextProps.events;
      this.eventObj = _.find(events, {id: Number(this.props.eventId)});
      this.eventObj = formatDateAndLocation(this.eventObj);
    }
  }

  _handleRsvpClick(eventId) {
    this.props.rsvpToEvent(eventId);
  }

  _handleUnRsvpClick(eventId) {
    this.props.unRsvpToEvent(eventId);
  }

  _formatDetails(detail) {
    if (detail && detail !== 'undefined undefined') {
      // **NOTE This logic is gross, and I would write better
      // logic to handle the contact person's first & last name.
      return detail;
    }
    return 'N/A';
  }

  render() {
    if (_.isEmpty(this.eventObj)) {
      return <div></div>;
    }

    let rsvpButton;

    // If the event id is in eventsAttending, tell the user they're already
    // attending this event. Allow user to change their RSVP if they
    // no longer want to attend.
    if (_.indexOf(this.props.eventsAttending, this.eventObj.id) !== -1) {
      rsvpButton = (
        <div>
          <span className="attending-text">
            <i className="fa fa-check" aria-hidden="true"></i>
            &nbsp;&nbsp;You are attending this event!
          </span><br /><br />
          <span>
            Want to change your RSVP?&nbsp;
            <button className="un-rsvp-button"
                    onClick={() => this._handleUnRsvpClick(this.eventObj.id)}>
              Click to un-RSVP.
            </button>
          </span>
        </div>
      );
    // If spaces left, let user RSVP to event.
    } else if (this.eventObj.are_spaces_remaining) {
      let eventId = this.eventObj.id;
      rsvpButton = (
        <button className="rsvp-button"
                onClick={() => this._handleRsvpClick(eventId)}>
          Click to RSVP!
        </button>
      );
    } else {
      rsvpButton = (
        <span className="sorry-full">
          Sorry! This event is already full.&nbsp;&nbsp;
          <i className="fa fa-frown-o" aria-hidden="true"></i>
        </span>
      );
    }
    console.log(this.eventObj);
    return (
      <div className="event-details">
        <h1 className="event-header">
          {this.eventObj.name}
        </h1>
        <p className="event-detail-p">
          <strong>Description: </strong>
            {this._formatDetails(this.eventObj.description)}
        </p>
        <p className="event-detail-p">
          <strong>Location: </strong>
            {this._formatDetails(this.eventObj.location)}
        </p>
        <p className="event-detail-p">
          <strong>Time: </strong>
            {this._formatDetails(this.eventObj.time)}
        </p>
        <p className="event-detail-p">
          <strong>Host Name: </strong>
            {this._formatDetails(this.eventObj.host_name)}
        </p>
        <p className="event-detail-p">
          <strong>Contact Name: </strong>
            {this._formatDetails(`${this.eventObj.contact_first_name} ${this.eventObj.contact_last_name}`)}
        </p>
        <p className="event-detail-p">
          <strong>Contact Phone: </strong>
            {this._formatDetails(this.eventObj.contact_phone)}
        </p>
        <p className="event-detail-p">
          <strong>Contact Email: </strong>
            {this._formatDetails(this.eventObj.contact_email)}
        </p>
        {rsvpButton} <br /><br />
        <a className="event-detail-p back-link" href="/">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          &nbsp;&nbsp;Go back to the event list
        </a>
      </div>
    );
  }
}

export default EventDetails;
