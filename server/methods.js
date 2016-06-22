import { UserData } from '../imports/api/userData'
import { AvatarsDB } from '../imports/api/avatarsDB'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'addToUserData'(name) {
    //UserData.insert({user: name, url: "/img/no-avatar.png", avatar: "/img/no-avatar.png"})
  },

  'updateAvatar'(img) {
    if(Meteor.user()) {
      let exists = AvatarsDB.findOne({"name": Meteor.user().username});
      if(exists) {
        AvatarsDB.update({_id: exists._id}, {$set: {avatar: img}})
      } else {
        AvatarsDB.insert({name: Meteor.user().username, avatar: img})
      }
    }
  },

  'addToCards'(img, com) {
    if(Meteor.user()) {
      let name = Meteor.user().username;
      let obj = {user: name, url: img, likes: [], dislikes: [], text: com};
      UserData.insert(obj)
    }
  },

  'removeCard'(id) {
    if(Meteor.user()) {
      let card = UserData.findOne({_id: id});
      if(card.user = Meteor.user().username) {
        UserData.remove({_id: id})
      }
    }
  },

  'pressedLike'(id) {
    if(Meteor.user()) {
      let u = Meteor.user().username;
      let likes = UserData.findOne({_id: id}).likes;
      let dislikes = UserData.findOne({_id: id}).dislikes;
      if(likes.indexOf(u) < 0) {
        UserData.update({_id: id}, {$push: {likes: u}});
        if(dislikes.indexOf(u) >= 0) {
          UserData.update({_id: id}, {$pull: {dislikes: u}});
        }
      }
    }
  },

  'pressedDislike'(id) {
    if(Meteor.user()) {
      let u = Meteor.user().username;
      let likes = UserData.findOne({_id: id}).likes;
      let dislikes = UserData.findOne({_id: id}).dislikes;
      if(dislikes.indexOf(u) < 0) {
        UserData.update({_id: id}, {$push: {dislikes: u}});
        if(likes.indexOf(u) >= 0) {
          UserData.update({_id: id}, {$pull: {likes: u}});
        }
      }
    }
  },

  'getAvatar'(name) {
    let user = AvatarsDB.findOne({name: name});
    if(user) {
      return user.avatar
    }
    return null;
  }

});
