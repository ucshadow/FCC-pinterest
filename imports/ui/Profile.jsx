import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import UserInfo from '../ui/UserInfo.jsx'


class Profile extends Component {

  constructor() {
    super();

    this.displayUserInfo = this.displayUserInfo.bind(this);
    this.userInfo = this.userInfo.bind(this);
  }

  displayUserInfo() {
    return (
      <div className="user-info" key="d1g23h5fds5">
        Username: {Meteor.user().username}
        <br />
      </div>
    )
  }

  userInfo() {
    return this.props.user.map((u) => {
      return <UserInfo key={Math.random()} d={u} />
    })
  }

  render() {
    return (
      <div className="user-info">
        {this.props.user.map((u) => {
          return (u ? this.displayUserInfo() : (Meteor.user() ? "Loading..." : "Please Log In to access your profile"))
          })}
        {this.userInfo()}
      </div>
    )
  }
}


Profile.propTypes = {
  user: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    user: [Meteor.user()]
  };
}, Profile);

