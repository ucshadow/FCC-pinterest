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
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

injectTapEventPlugin();

let links = ["/", "/Profile", "/MyCards", "/about"];
const style = {
  height: "10em",
  width: "100%",
  display: 'inline-block',
  background: "#455A64"
};


class Navigation extends Component{

  constructor(props) {
    super(props);
    this.state = {page: links.indexOf(window.location.pathname)};

    this.routeTo = this.routeTo.bind(this);
  }

  routeTo(tab) {
    this.setState({page: links.indexOf(tab.props.route)});
    this.props.router.push(tab.props.route);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <Paper style={style} zDepth={4}>
          <div className="dark-line"> </div>
          <BackToTop />
          <Toolbar zDepth={4} style={{background: "none"}}>
            <ToolbarGroup>
              <Link to="/" className="nav-button"> <FlatButton label="Home" labelStyle={{color: "#CFD8DC"}}/> </Link>
              <Link to="/Profile" className="nav-button"> <FlatButton label="Profile" labelStyle={{color: "#CFD8DC"}} /> </Link>
              <Link to="/MyCards" className="nav-button"> <FlatButton label="My Cards" labelStyle={{color: "#CFD8DC"}} /> </Link>
              <Link to="/about" className="nav-button"> <FlatButton label="About" labelStyle={{color: "#CFD8DC"}} /> </Link>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <div className="nav-account"><AccountsUIWrapper /></div>
            </ToolbarGroup>
          </Toolbar>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

class BackToTop extends Component {

  constructor() {
    super();

    this.backToTop = this.backToTop.bind(this);
  }

  backToTop() {
    $("html, body").animate({
      scrollTop: 0
    }, 400);
  }

  render() {
    return (
      <FloatingActionButton secondary={true} className="back-to-top"
        zDepth={4} onMouseDown={this.backToTop}>
        <ArrowUpward />
      </FloatingActionButton>
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