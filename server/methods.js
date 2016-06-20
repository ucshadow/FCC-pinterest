import { UserData } from '../imports/api/userData'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'userData.update'(elementId, value) {

    // code here

  },

  'updateAvatar'(img) {
    if(Meteor.user()) {
      let id = Meteor.userId();
      let prof = Meteor.users.findOne({_id: id});
      if(prof.profile === null) {
        Meteor.users.update(id, {$set: {profile: {avatar: img}}})
      } else {
        Meteor.users.update(id, {$set: {"profile.avatar": img}})
      }
    }
  },

  'getUserCards'() {
    console.log('called');
    if(Meteor.user) {
      let cards = UserData.findOne({"name": Meteor.user().username});
      if(cards.cards) {
        return cards.cards;
      } else {
        return null;
      }
    }
  },

  'addToCards'(img, com) {
    if(Meteor.user()) {
      let name = Meteor.user().username;
      let obj = {url: img, likes: 0, dislikes: 0, text: com};
      let data = UserData.findOne({name: name});
      UserData.update({_id: data._id}, {$push: {cards: obj}})
    }
  }

});
