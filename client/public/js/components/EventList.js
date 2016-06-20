import _ from 'lodash';
import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

import { formatDateAndLocation } from './helpers.js';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this._events = [];
  }

  componentDidMount() {
    if (typeof this.props.getEvents !== 'function') {
      return;
    }
    this.props.getEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (this._events.length === 0 && nextProps.events.length > 0) {
      // Sort by event start time so we can display chronologically
      let events = _.sortBy(nextProps.events, ev => ev.start);

      // Go through events and format each date and location for display
      this._events = _.map(events, formatDateAndLocation);
    }
  }

  _getWindowHeight() {
    // Scale table to height of window
    // **NOTE: If I had time, I'd add some onWindowResize functionality
    // to rescale table height when window changes.
    // I'd also do this kind of thing for width and make the table width
    // dynamic.
    let height = 0;
    if (typeof window !== 'undefined') {
      height = window.innerHeight - 100;
    }
    return height;
  }

  render() {
    return (
      // **NOTE: If I had more time, I'd add sorting and filtering to this table.
      <Table
        rowsCount={this._events.length}
        rowHeight={50} // **NOTE: Ideally, all these height & width props should be dynamic.
        headerHeight={50}
        width={1050}
        maxHeight={this._getWindowHeight()}>
        <Column
          header={<Cell className="header-cell">What?</Cell>}
          cell={<LinkCell data={this._events} />}
          width={250}
        />
        <Column
          header={<Cell className="header-cell">When?</Cell>}
          cell={props => (
            <Cell {...props}>
              {this._events[props.rowIndex].time}
            </Cell>
          )}
          width={250}
        />
        <Column
          header={<Cell className="header-cell">Where?</Cell>}
          cell={props => (
            <Cell {...props}>
              {this._events[props.rowIndex].location}
            </Cell>
          )}
          width={300}
        />
        <Column
          header={<Cell className="header-cell">Want to attend?</Cell>}
          cell={<RSVPCell data={this._events}
                          eventsAttending={this.props.eventsAttending}
          />}
          width={250}
        />
      </Table>
    );
  }
}

const LinkCell = ({rowIndex, data, ...props}) => {
  let link = `/${data[rowIndex].id}`;
  // **NOTE: I thought it'd be nice to make the event
  // name a link to the details, as well as the link
  // in the RSVP column. Ideally, the whole row would be
  // clickable. OR, even better, we'd have a panel slide
  // out or modal (do people hate modals?) with the details
  // so you don't even have to leave the page.
  return (
    <Cell>
      <a className="table-link" href={link}>
        {data[rowIndex].name}
      </a>
    </Cell>
  );
}

const RSVPCell = ({rowIndex, data, eventsAttending, ...props}) => {
  let eventObj = data[rowIndex],
      link = `/${eventObj.id}`;

  // If this event's id is in eventsAttending, tell the user
  // he/she is already attending the event.
  if (_.indexOf(eventsAttending, eventObj.id) !== -1) {
    return (
      <Cell>
        You are attending this event!<br/>
        <a className="table-link" href={link}>
          Click for details.
        </a>
      </Cell>
    );
  // Make sure there are spaces remaining before letting the
  // user RSVP.
  } else if (eventObj.are_spaces_remaining) {
    return (
      <Cell>
        {`Join ${eventObj.participant_count} other Hillary supporters.`}<br/>
        <a className="table-link" href={link}>
          Click for details & to RSVP!
        </a>
      </Cell>
    );
  // If no spaces remaining, don't let the user RSVP.
  } else {
    return (
      <Cell>
        Sorry! This event is already full.&nbsp;&nbsp;
        <i className="fa fa-frown-o" aria-hidden="true"></i><br/>
        <a className="table-link" href={link}>
          Click for details.
        </a>
      </Cell>
    );
  }
}

export default EventList;
