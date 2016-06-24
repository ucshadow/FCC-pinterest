import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import Navigation from '../ui/Navigation.jsx'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const lightMuiTheme = getMuiTheme(lightBaseTheme);


export default class About extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          <Navigation />
          <div className="about-description">
            A project By Catalin for freecodecamp.com -- build a Pinterest Clone
            <br />
            <ul>
              <li>
                Meteor
              </li>
              <li>
                React
              </li>
              <li>
                React Router
              </li>
              <li>
                Material UI
              </li>
            </ul>
            <br />
            <a href="https://github.com/ucshadow/FCC-pinterest"> GitHub Repo </a>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

About.propTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    muiTheme: getMuiTheme()
  };
}, About);