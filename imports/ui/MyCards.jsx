import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { UserData } from '../api/userData'
import StateHolder from '../ui/SingleCard.jsx'
import Navigation from '../ui/Navigation.jsx'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class MyCards extends Component {

  constructor(props) {
    super(props);

    this.addCard = this.addCard.bind(this);
    this.myCards = this.myCards.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.userData.length !== nextProps.userData.length;
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  addCard() {
    let img = $("#pic").val();
    let com = $("#comment").val();
    let desc = $('.description-add-card');
    if(com.length > 200) {
      com = com.substring(0, 200);
    }

    this.imageExists(img, function(image) {
      if(image) {
        Meteor.call("addToCards", img, com)
      } else {
        desc.text("Can't load that image!");
        desc.css("color", "#ff4081");
        setTimeout(function() {
          desc.css("color", "#b3b3b3");
          desc.text("Paste picture link into the Picture URL area")
        }, 2000)
      }
    })
  }

  myCards() {
    return this.props.userData.map((c) => {
      return <StateHolder key={Math.random()} _id={c._id}  d={c} profile={true} />
    })
  }

  render() {
    if(this.props.user !== "-") {
      return (
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div>
            <Navigation />
            <div className="my-cards-container">
              <div className="description-add-card">
                Paste picture link into the Picture URL area
              </div>
              <div className="add-input-group">

                <TextField
                  hintText="Picture URL"
                  floatingLabelText="Picture URL"
                  id="pic"
                />
                <TextField
                  hintText="Comment"
                  floatingLabelText="Comment"
                  id="comment"
                  style={{marginLeft: "1em"}}
                />

                <FlatButton label="Add Card" secondary={true} onClick={this.addCard} />

              </div>
              <div className="card-holder">
                {this.myCards()}
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      )
    } else {
      return (
        <MuiThemeProvider muiTheme={lightMuiTheme}>
          <div className="user-info">
            <Navigation />
            Please Log In to access your Cards!
          </div>
        </MuiThemeProvider>
      )
    }
  }
}


MyCards.propTypes = {
  user: PropTypes.string.isRequired,
  userData: PropTypes.array.isRequired,
  muiTheme: PropTypes.object.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("userData");
  let u = Meteor.user();
  return {
    user: (Meteor.user() ? Meteor.user().username : "-"),
    userData: u ? UserData.find({user: u.username}).fetch() : [],
    muiTheme: getMuiTheme()
  };
}, MyCards);


