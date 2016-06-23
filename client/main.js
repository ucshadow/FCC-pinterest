import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import Navigation from '../imports/ui/Navigation.jsx'

import '../imports/startup/accounts-config.js';
//import { YourCustomCollection } from '../imports/api/yourCustomCollection.js';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/Home.jsx';
import About from '../imports/ui/About.jsx';
import NotFound from '../imports/ui/NotFound.jsx';
import Profile from '../imports/ui/Profile.jsx';
import MyCards from '../imports/ui/MyCards.jsx';
import AllUserPosts from '../imports/ui/AllUserPosts.jsx';


export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="Profile" component={ Profile } nav={<Navigation />}/>
      <Route path="MyCards" component={ MyCards } />
      <Route path="about" component={ About } nav={<Navigation />} />
      <Route path="all-posts/:poster" component={ AllUserPosts } />
      <Route path="*" component={ NotFound } />
    </Route>
  </Router>
);


Meteor.startup(() => {

  render(renderRoutes(), document.getElementById('app'));

});

Tracker.autorun(function(c) {

});