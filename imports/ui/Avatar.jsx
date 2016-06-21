import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { AvatarsDB } from '../api/avatarsDB'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {avatar: null};

    this.selectAvatar = this.selectAvatar.bind(this);
  }

  selectAvatar() {
    let url = "/img/no-avatar.png";
    return this.props.avatars.map((a) => {
      if(a.name === this.props.title) {
        url = a.avatar;
        return <Pic key={Math.random()} img={url} />
      }
    })
  }

  render() {
    return (
      <CardHeader
        title={this.props.title}>
        {this.selectAvatar()}
      </CardHeader>
    )
  }
}

class Pic extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div size="40" className="avatar" style={{background: "url('" + this.props.img + "') 0% 0% / 40px border-box"}}> </div>
    )
  }
}


Avatar.propTypes = {
  userName: PropTypes.string.isRequired,
  avatars: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("avatars");
  return {
    userName: (Meteor.user() ? Meteor.user().username : "-"),
    avatars: AvatarsDB.find({}).fetch()
  }
}, Avatar);