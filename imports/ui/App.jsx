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

  constructor(props) {
    super(props);
    //this.state = {page: links.indexOf(this.props.location.pathname)};
    //console.log(this.props.location.pathname);

    this.routeTo = this.routeTo.bind(this)
  }

  routeTo(tab) {
    this.setState({page: links.indexOf(tab.props.route)});
    this.props.router.push(tab.props.route);
    test()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          <div className="whole-nav">
            <nav role="navigation" className="navbar navbar-default" style={{
            background: "none", border: "none"}}>
              <div id="navbarCollapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className="nav-button"><Link to="/" > Home </Link></li>
                  <li className="nav-button"><Link to="/Profile"> Profile </Link></li>
                  <li className="nav-button"><Link to="/MyCards"> My Cards </Link></li>
                  <li className="nav-button"><Link to="/about"> About </Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-account"><AccountsUIWrapper /></li>
                </ul>
              </div>
            </nav>
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