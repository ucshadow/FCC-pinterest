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
    img.onerror = function() { callback(true); };
    img.src = url;
  }

  addCard() {
    let img = $("#pic").val();
    let com = $("#comment").val();
    if(img.indexOf("youtube.com/watch") >= 0) {
      // youtube url transform
      let a = img;
      let b = a.split("watch")[0] + "embed/" + a.substring(a.length - 11, a.length);
      Meteor.call("addToCards", b, com);
      return;
    }
    if(com.length > 200) {
      com = com.substring(0, 200);
    }

    this.imageExists(img, function(image) {
      if(image) {
        Meteor.call("addToCards", img, com)
      } else {
        console.log("Can't load that image!")
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
                Paste [jpg, png, gif, webm, youtube] link into the Media URL area
              </div>
              <div className="add-input-group">

                <TextField
                  hintText="Media URL"
                  floatingLabelText="Media URL"
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


