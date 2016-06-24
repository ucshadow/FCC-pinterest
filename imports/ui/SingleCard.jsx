import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from '../ui/Avatar.jsx';
import { UserData } from "../api/userData";
import VoteTracker from '../ui/VoteTracker.jsx'
import DisplayImage from '../ui/DisplayImage.jsx'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Badge from 'material-ui/Badge';

export default class StateHolder extends React.Component {

  render() {
    return <Container id={this.props.d._id} profile={this.props.profile}/>;
  }
}


class SingleCard extends Component {

  constructor(props) {
    super(props);

    this.deleteCard = this.deleteCard.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  deleteCard() {
    Meteor.call("removeCard", this.props._id)
  }

  render() {
    return (
      <div className="single-card">
        <Card  zDepth={4} containerStyle={{background: "#455A64"}}>
          {(this.props.profile ?
            <CardHeader
              title={<button className="delete-button" onClick={this.deleteCard}> X </button>}
              style={{padding: 0}}
            /> :
          null)}
          <Avatar key={Math.random()} title={this.props.d.user} />
          <DisplayImage key={Math.random()} d={this.props.d} />
          <CardText
            color="white"
            style={{textAlign: "center"}}
          > {this.props.d.text} </CardText>
          <VoteTracker d={this.props.d} />
        </Card>
      </div>
    )
  }
}


SingleCard.propTypes = {
  userName: PropTypes.string.isRequired
};

let Container = createContainer((props) => {
  let doc = UserData.findOne({_id: props.id});
  return {
    d: doc ? doc : null,
    userName: (Meteor.user() ? Meteor.user().username : "-"),
    profile: props.profile,
    _id: props.id
  }
}, SingleCard);