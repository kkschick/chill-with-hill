import React from 'react';
import { connect } from 'react-redux';

import EventList from './EventList';
import { getEvents } from '../actions/eventActions';

require('../../css/fixed-data-table.min.css');
require('../../css/main.css');

class EventListContainer extends React.Component {
  colorizeText(str) {
    // Colorize header text to alternate red and blue
    // This is just for fun. :)
    return str.split('').map((letter, idx) => {
      let color = idx % 2 == 0 ? '#e51d2e' : '#0050a0';
      return <span style={{color}} key={idx}>{letter}</span>;
    });
  }

  render() {
    return (
        <div>
          <h1 className="list-header">
              {this.colorizeText('Chill with Hill — Find local events & meet other HRC supporters!')}
              &nbsp;&nbsp;
              <i className="fa fa-arrow-right" aria-hidden="true" style={{color: '#e51d2e'}}></i>
          </h1>
          <EventList
            events={this.props.events}
            eventsAttending={this.props.eventsAttending}
            errorMessage={this.props.errorMessage} // **NOTE: Not currently doing anything with this but would if more time.
            getEvents={() => this.props.onGetEvents()}
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
    onGetEvents: () => dispatch(getEvents())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
