import React, { Component, PropTypes } from 'react';
import { VoteData } from '../api/voteData';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

const darkMuiTheme = getMuiTheme(darkBaseTheme);
const lightMuiTheme = getMuiTheme(lightBaseTheme);
const style = {marginRight: 20};
const pictureStyle = {width: "80%", height: "80%", marginLeft: "10%"};


export default class AddCardComponents extends Component {

  constructor(props) {
    super(props);
    this.state = ({vote: undefined});

    this.deleteCard = this.deleteCard.bind(this);
    this.checkVoteStatus = this.checkVoteStatus.bind(this);
    this.renderVote = this.renderVote.bind(this);
    this.likeStyle = this.likeStyle.bind(this);
    this.dislikeStyle = this.dislikeStyle.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  deleteCard() {
    Meteor.call("removeCard", this.props._id_)
  }

  renderVote(res) {
    let up = 1 + this.props._id_;
    let down = this.props._id_;
    if(res.votes.indexOf(up) >= 0) {
      this.setState({vote: up})
    }
    else if(res.votes.indexOf(down) >= 0) {
      this.setState({vote: down})
    }
  }

  checkVoteStatus() {
    let getOut = this.renderVote;
    if(Meteor.user() && !this.state.vote) {
      Meteor.call("getMyVotes", function(err, res) {
        if(err) {
          console.log(err);
        }
        getOut(res);
      })
    }
  }

  likeStyle() {
    let color;
    if(this.state.vote > 1) {
      color = "green"
    } else {
      color = "rgba(0, 0, 0, 0.870588)"
    }
    return {fill: color}
  }

  dislikeStyle() {
    let color;
    if(this.state.vote < 1) {
      color = "red"
    } else {
      color = "rgba(0, 0, 0, 0.870588)"
    }
    return {fill: color}
  }

  like() {
    let w = $("#" + this.props._id_);
    if(Meteor.user()) {
      Meteor.call("pressedLike", this.props.userName, this.props._id_)
    } else {
      w.text("Login to vote!");
      setTimeout(function() {
        w.text(" ");
      }, 1000)
    }
  }

  dislike() {
    let w = $("#" + this.props._id_);
    if(Meteor.user()) {
      Meteor.call("pressedDislike", this.props.userName, this.props._id_)
    } else {
      w.text("Login to vote!");
      setTimeout(function() {
        w.text(" ");
      }, 1000)
    }
  }

  render() {
    this.checkVoteStatus();
    return (
      <div className="single-card">
        <Card  zDepth={4}>
          <CardHeader
            title={this.props.userName}
            avatar={(this.props.avatar ? this.props.avatar : "/img/no-avatar.png")}/>
          <CardMedia mediaStyle={pictureStyle}>
            <img src={this.props.d.url} />
          </CardMedia>
          <CardText>
            {this.props.d.text}
          </CardText>
          <CardActions>
            <div className="vote-buttons" >
              <IconButton tooltip="Like" iconStyle={this.likeStyle()} onClick={this.like}>
                <ThumbUp />
              </IconButton>
              <IconButton tooltip="Dislike" iconStyle={this.dislikeStyle()} onClick={this.dislike}>
                <ThumbDown />
              </IconButton>
              {(this.props.profile ?
              <IconButton tooltip="Delete" onClick={this.deleteCard}>
                <DeleteForever />
              </IconButton> :
              null)}
            </div>
            <div className="vote-counter" >
              <span className="likes-text">{this.props.d.likes}</span>
              <span className="dislikes-text">{this.props.d.dislikes}</span>
            </div>
            <div id={this.props._id_} className="vote-warning"> </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}
