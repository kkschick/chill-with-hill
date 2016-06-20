import React from 'react';
import { Router, Route } from 'react-router';

import EventDetailsContainer from './components/EventDetailsContainer';
import EventListContainer from './components/EventListContainer';
// **NOTE: I'm using these container components as "dumb" components,
// with their internal components as "smart" components.
// See https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.n885bybyj

const routes = (
  <Router>
    <Route path="/" component={ EventListContainer } />
    <Route path="/:id" component={ EventDetailsContainer } />
  </Router>
);

export default routes;
