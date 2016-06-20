import 'whatwg-fetch'; // **NOTE: This is so fetch will work in Safari & IE

import * as types from './actionTypes';

// **NOTE: There is a lot of duplicated code here. If I had more time, I would do
// some refactoring to create an XhrActionHandler to make this less boilerplate-y.

export function getEvents() {
  return function(dispatch) {
    dispatch({type: types.RETRIEVE_EVENTS_REQUEST});
    fetch('/api/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({type: types.RETRIEVE_EVENTS_FAILURE, error: 'Failed to retrieve events. Please try again.'});
      }
    }).then((responseJson) => {
      dispatch({type: types.RETRIEVE_EVENTS_SUCCESS, data: responseJson});
    }).catch((error) => {
      dispatch({type: types.RETRIEVE_EVENTS_FAILURE, error: 'Failed to retrieve events. Please try again.'});
    });
  };
}

export function rsvpToEvent(eventId) {
  return function(dispatch) {
    dispatch({type: types.RSVP_UPDATE_REQUEST});
    let url = '/api/rsvp/' + eventId;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({type: types.RSVP_UPDATE_FAILURE, error: 'Failed to RSVP to event.'});
      }
    }).then((responseJson) => {
      dispatch({type: types.RSVP_UPDATE_SUCCESS, data: responseJson});
    }).catch((error) => {
      dispatch({type: types.RSVP_UPDATE_FAILURE, error: 'Failed to RSVP to event.'});
    })
  };
}

export function unRsvpToEvent(eventId) {
  return function(dispatch) {
    dispatch({type: types.UN_RSVP_UPDATE_REQUEST});
    let url = '/api/unrsvp/' + eventId;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({type: types.UN_RSVP_UPDATE_FAILURE, error: 'Failed to un-RSVP to event.'});
      }
    }).then((responseJson) => {
      dispatch({type: types.UN_RSVP_UPDATE_SUCCESS, data: responseJson});
    }).catch((error) => {
      dispatch({type: types.UN_RSVP_UPDATE_FAILURE, error: 'Failed to un-RSVP to event.'});
    })
  };
}
