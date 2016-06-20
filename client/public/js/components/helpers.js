import moment from 'moment';

// **NOTE: This method 
export function formatDateAndLocation(eventObj) {
  // Convert unix timestamps to local time and format into time range for display
  // **NOTE: I'm assuming we want to display these times in the user's local time.
  let startTime = moment.unix(eventObj.start).local().format('MMM DD, YYYY hh:mm a - '),
      endTime = moment.unix(eventObj.end).local().format('hh:mm a');
  eventObj['time'] = startTime + endTime;

  // Concatenate all address fields into one location string
  // **NOTE: I'm not sending back country in the endpoint because I'm assuming
  // all of these events are happening in the U.S.
  // Also, this string concatenation is pretty gross. If I had more time, I
  // would've cleaned up all these strings (trimmed white space, commas, etc.)
  // to make this look prettier.
  eventObj['location'] = `${eventObj['location_name']},
                          ${eventObj['address1']} ${eventObj['address2']},
                          ${eventObj['city']}, ${eventObj['state']}
                          ${eventObj['postal_code']}`;
  return eventObj;
}
