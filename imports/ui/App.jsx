import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router'

import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Navigation from '../ui/Navigation.jsx'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const lightMuiTheme = getMuiTheme(lightBaseTheme);


export default class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          <div className="whole-nav">
        </div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}



App.propTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("userData");
  return {
    muiTheme: getMuiTheme()
  }
}, withRouter(App));