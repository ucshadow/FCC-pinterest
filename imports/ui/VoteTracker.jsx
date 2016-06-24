import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from '../ui/Avatar.jsx';
import { UserData } from "../api/userData";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Badge from 'material-ui/Badge';

export default class VoteTracker extends React.Component {

  render() {
    return <Container id={this.props.d._id}/>;
  }
}

class VoteRender extends Component {

  constructor(props) {
    super(props);
    this.state = ({vote: undefined});

    let liked = this.props.d.likes.indexOf(this.props.userName);
    let disliked = this.props.d.dislikes.indexOf(this.props.userName);

    if(liked >= 0) {
      this.state = ({vote: "green"})
    }
    if(disliked >= 0) {
      this.state = ({vote: "red"})
    }

    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.getIconStyle = this.getIconStyle.bind(this);
  }

  like() {
    let w = $("#" + this.props.d._id);
    if(Meteor.user()) {
      this.setState({vote: "green"});
      Meteor.call("pressedLike", this.props.d._id)
    } else {
      w.text("Login to vote!");
      setTimeout(function() {
        w.text(" ");
      }, 1000)
    }
  }

  dislike() {
    let w = $("#" + this.props.d._id);
    if(Meteor.user()) {
      this.setState({vote: "red"});
      Meteor.call("pressedDislike", this.props.d._id)
    } else {
      w.text("Login to vote!");
      setTimeout(function() {
        w.text(" ");
      }, 1000)
    }
  }

  getIconStyle(caller) {
    if(caller === "like") {
      if(this.state.vote === "green") {
        return {fill: "#388E3C"}
      } else {
        return {fill: "rgba(0, 0, 0, 0.870588)"}
      }
    }
    if(caller === "dislike") {
      if(this.state.vote === "red") {
        return {fill: "#FF4081"}
      } else {
        return {fill: "rgba(0, 0, 0, 0.870588)"}
      }
    }
  }

  render() {
    return (
      <CardActions style={{height: "6em", padding: 0, paddingLeft: "20%", left: "-0.5em"}}>
        <div className="vote-buttons" >
          <Badge
            badgeContent={this.props.d.likes.length}
            badgeStyle={{top: 40, right: 62, fill: "#607D8B"}}
          >
            <IconButton iconStyle={this.getIconStyle("like")} onClick={this.like}>
              <ThumbUp />
            </IconButton>
          </Badge>
          <Badge
            badgeContent={this.props.d.dislikes.length}
            badgeStyle={{top: 34, right: 10, fill: "#607D8B"}}
          >
            <IconButton iconStyle={this.getIconStyle("dislike")} onClick={this.dislike}>
              <ThumbDown />
            </IconButton>
          </Badge>
        </div>
        <div id={this.props.d._id} className="vote-warning"> </div>
      </CardActions>
    )
  }
}

let Container = createContainer((props) => {
  let doc = UserData.findOne({_id: props.id});
  let userName = null;
  if(Meteor.user()) {
    userName = Meteor.user().username
  }
  return {
    d: doc ? doc : null,
    userName: userName
  }
}, VoteRender);