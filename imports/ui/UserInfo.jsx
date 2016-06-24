import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { UserData } from '../api/userData'
import { AvatarsDB } from '../api/avatarsDB'

import TextField from 'material-ui/TextField';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class UserInfo extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.avatars);

    this.selectAvatar = this.selectAvatar.bind(this);
  }

  selectAvatar() {
    let url = "/img/no-avatar.png";
    return this.props.avatars.map((a) => {
      if(a.name === this.props.userName) {
        url = a.avatar;
      }
      return <Pic key={Math.random()} img={url} user={this.props.d.username}/>
    })
  }



  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
          {this.selectAvatar()}
        </div>
      </MuiThemeProvider>
    )
  }
}


class Pic extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);

    this.changeAvatar = this.changeAvatar.bind(this);
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  changeAvatar() {
    let img = $("#newAvatar").val();
    console.log(img);
    this.imageExists(img, function(image) {
      if(image) {
        Meteor.call("updateAvatar", img)
      } else {
        console.log("Can't load that image!")
      }
    })
  }

  render() {
    return (
      <div className="profile-avatar-container">
        <Card zDepth={4} containerStyle={{background: "rgb(72, 105, 112)"}}>
          <CardHeader
            title={this.props.user}
          />
          <CardMedia
            overlay={<CardTitle title="Current Avatar" />}
          >
            <img src={this.props.img} />
          </CardMedia>
          <CardText>
            This is your current profile, you can change your Avatar here.
            Picture with equal (or almost equal) width and height will look the best, if not
            they could get cropped or repeated. Gifs are also supported
          </CardText>
          <CardActions>
            <TextField
              id="newAvatar"
              hintText="New Avatar URL"
              floatingLabelText="New Avatar URL"
            />
            <FlatButton label="Change" secondary={true} onClick={this.changeAvatar}/>
          </CardActions>
        </Card>
      </div>
    )
  }
}



UserInfo.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  avatars: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("avatars");
  let u = Meteor.user();
  return {
    muiTheme: getMuiTheme(),
    userName: (Meteor.user() ? Meteor.user().username : "-"),
    avatars: u ? AvatarsDB.find({}).fetch() : []
  }
}, UserInfo);

