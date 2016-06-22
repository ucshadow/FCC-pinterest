import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from '../ui/Avatar.jsx'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Badge from 'material-ui/Badge';

const pictureStyle = {width: "80%", height: "80%", marginLeft: "10%", border: "#223539 1px solid"};


export default class SingleCard extends Component {

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

    this.deleteCard = this.deleteCard.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.getIconStyle = this.getIconStyle.bind(this);
  }

  deleteCard() {
    Meteor.call("removeCard", this.props._id)
  }

  getIconStyle(caller) {
    if(caller === "like") {
      if(this.state.vote === "green") {
        return {fill: "rgb(0, 188, 212)"}
      } else {
        return {fill: "rgba(0, 0, 0, 0.870588)"}
      }
    }
    if(caller === "dislike") {
      if(this.state.vote === "red") {
        return {fill: "rgb(255, 64, 129)"}
      } else {
        return {fill: "rgba(0, 0, 0, 0.870588)"}
      }
    }
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

  render() {
    return (
      <div className="single-card">
        <Card  zDepth={4} containerStyle={{background: "rgb(72, 105, 112)"}}>
          <Avatar key={Math.random()} title={this.props.d.user} />
          <DisplayImage key={Math.random()} d={this.props.d.url} />
          <CardText
            color="#d9edf7"
            style={{textAlign: "center"}}
          > {this.props.d.text} </CardText>
          <CardActions style={{top: "-1em", left: "4em", height: "6em"}}>
            <div className="vote-buttons" >
              <Badge
                badgeContent={this.props.d.likes.length}
                secondary={true}
                badgeStyle={{top: 40, right: 62}}
              >
                <IconButton tooltip="Like" iconStyle={this.getIconStyle("like")} onClick={this.like}>
                  <ThumbUp />
                </IconButton>
              </Badge>
              <Badge
                badgeContent={this.props.d.dislikes.length}
                primary={true}
                badgeStyle={{top: 34, right: 10}}
              >
                <IconButton tooltip="Dislike" iconStyle={this.getIconStyle("dislike")} onClick={this.dislike}>
                  <ThumbDown />
                </IconButton>
              </Badge>
              {(this.props.profile ?
              <IconButton
                tooltip="Delete"
                onClick={this.deleteCard}
                iconStyle={{position: "absolute", top: "80%", right: "4px", fill: "#ff4081"}}
              >
                <DeleteForever />
              </IconButton> :
              null)}
            </div>
            <div id={this.props.d._id} className="vote-warning"> </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}


class DisplayImage extends Component {

  constructor(props) {
    super(props);
    this.state = {img: this.props.d};


    this.imageExists(this.props.d, (image) => {
      if(!image) {
        this.setState({img: "/img/no-image.jpg"})
      }
    })

  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  render() {
    return (
      <CardMedia mediaStyle={pictureStyle}>
        <img src={this.state.img} />
      </CardMedia>
    )
  }
}







SingleCard.propTypes = {
  userName: PropTypes.string.isRequired
};

export default createContainer(() => {
  return {
    userName: (Meteor.user() ? Meteor.user().username : "-")
  }
}, SingleCard);
