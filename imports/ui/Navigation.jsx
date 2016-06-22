import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router'

import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

injectTapEventPlugin();

let links = ["/", "/Profile", "/MyCards", "/about"];


class Navigation extends Component{

  constructor(props) {
    super(props);
    this.state = {page: links.indexOf(window.location.pathname)};

    this.routeTo = this.routeTo.bind(this)
  }

  routeTo(tab) {
    this.setState({page: links.indexOf(tab.props.route)});
    this.props.router.push(tab.props.route);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div className="navigation-holder">
          <Tabs initialSelectedIndex={this.state.page} >
            <Tab label="Home" route="/" onActive={this.routeTo} />
            <Tab label="Profile" route="/Profile" onActive={this.routeTo} />
            <Tab label="My Cards" route="/MyCards" onActive={this.routeTo} />
            <Tab label="About" route="/about" onActive={this.routeTo} />
          </Tabs>
        </div>
      </MuiThemeProvider>
    )
  }
}


Navigation.propTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("userData");
  return {
    muiTheme: getMuiTheme()
  }
}, withRouter(Navigation));