import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import Navigation from '../ui/Navigation.jsx'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const lightMuiTheme = getMuiTheme(lightBaseTheme);


export default class About extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          {this.props.route.nav}
          <div>
            Hi from About
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