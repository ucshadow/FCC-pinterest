import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { UserData } from '../api/userData'


export default class UserInfo extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.d);

    this.displayAvatar = this.displayAvatar.bind(this);
    this.getProfilePic = this.getProfilePic.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
  }

  getProfilePic() {
    if(this.props.d) {
      if(this.props.d.profile) {
        if(this.props.d.profile.avatar) {
          return this.props.d.profile.avatar
        }
      }
    }
    return "/img/no-avatar.png"
  }

  displayAvatar() {
    return (
      <div className="profile-avatar">
        <img src={this.getProfilePic()} />
      </div>
    )
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  changeAvatar() {
    let img = $("#newAvatar").val();
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
      <div>
        {this.displayAvatar()}
        <input type="text" id="newAvatar" placeholder="New Avatar URL" />
        <button onClick={this.changeAvatar}> Update </button>
      </div>
    )
  }
}

/*UserInfo.propTypes = {
  data: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    data: UserData.findOne({name: this.props.name})
  };
}, UserInfo);*/

