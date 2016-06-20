import * as types from '../actions/actionTypes';

function eventReducer(state = {events: [], eventsAttending: [], isLoading: false, errorMessage: ''}, action) {
  let events = [], eventsAttending = [];
  switch (action.type) {
    case types.RETRIEVE_EVENTS_SUCCESS:
      events = [ ...action.data ];
      return {
        ...state,
        events: events,
        isLoading: false,
        errorMessage: ''
      };
    case types.RSVP_UPDATE_SUCCESS:
      // **NOTE: This manipulation should ideally not be happening in the
      //   reducer, and if I had more time, I'd move it to the components.
      let responseData = action.data[0];
      events = [ ...state.events ];
      // Add RSVP event to eventsAttending so we can display properly
      eventsAttending = [ ...state.eventsAttending, responseData.id ];

      // Update spaces remaining, etc. for event that was RSVPed to
      let idx = _.findIndex(events, {id: responseData.id});
      events[idx].are_spaces_remaining = responseData.are_spaces_remaining;
      events[idx].spaces_remaining = responseData.spaces_remaining;
      events[idx].participant_count = responseData.participant_count;
      return {
        ...state,
        events: events,
        eventsAttending: eventsAttending,
        isLoading: false,
        errorMessage: ''
      };
    case types.UN_RSVP_UPDATE_SUCCESS:
      // **NOTE: This manipulation should ideally not be happening in the
      //   reducer, and if I had more time, I'd move it to the components.
      let resp = action.data[0];
      events = [ ...state.events ];

      // Remove RSVP event from eventsAttending
      eventsAttending = [ ...state.eventsAttending ];
      eventsAttending = _.remove(eventsAttending, e => e !== resp.id);

      // Update spaces remaining, etc. for event that was RSVPed to
      let index = _.findIndex(events, {id: resp.id});
      events[index].are_spaces_remaining = resp.are_spaces_remaining;
      events[index].spaces_remaining = resp.spaces_remaining;
      events[index].participant_count = resp.participant_count;
      return {
        ...state,
        events: events,
        eventsAttending: eventsAttending,
        isLoading: false,
        errorMessage: ''
      };
    case types.RETRIEVE_EVENTS_FAILURE:
    case types.RSVP_UPDATE_FAILURE:
    case types.UN_RSVP_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error
      };
    case types.RETRIEVE_EVENTS_REQUEST:
    case types.RSVP_UPDATE_REQUEST:
    case types.UN_RSVP_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

export default eventReducer;
