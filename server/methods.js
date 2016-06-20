import { UserData } from '../imports/api/userData'
import { VoteData } from '../imports/api/voteData'
import { Mongo } from 'meteor/mongo';


Meteor.methods({

  'addToUserData'(name) {
    console.log(name);
    UserData.insert({name: name, cards: [], avatar: "/img/no-avatar.png"})

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
      let ud = UserData.findOne({"name": Meteor.user().username})._id;
      UserData.update(ud, {$set: {avatar: img}})
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
      let obj = {url: img, likes: 0, dislikes: 0, text: com, _id_: Math.random()};
      let data = UserData.findOne({name: name});
      UserData.update({_id: data._id}, {$push: {cards: obj}})
    }
  },

  'removeCard'(id) {
    if(Meteor.user()) {
      let u = UserData.findOne({name: Meteor.user().username});
      UserData.update(
        {_id: u._id},
        {$pull: {
          cards: {_id_: id}
        }}, false, true
      )
    }
  },

  'getMyVotes'() {
    if(Meteor.user()) {
      let data = VoteData.findOne({name: Meteor.user().username});
      if(!data) {
        VoteData.insert({name: Meteor.user().username, votes: []});
        data = VoteData.findOne({name: Meteor.user().username});
      }
      return data
    }
  },

  'pressedLike'(cardName, _id_) {
    let votes = VoteData.findOne({"name": Meteor.user().username}).votes;
    let u = UserData.findOne({name: cardName});
    UserData.update(
      {_id : u._id , "cards._id_" : _id_ } ,
                {$inc : {"cards.$.likes" : 1} }
    );
    if(votes.indexOf(_id_ + 1) < 0 || votes.indexOf(_id_) < 0) {
      VoteData.update({name: Meteor.user().username}, {$push: {votes: 1 + _id_}})
      console.log(votes.length);
    }
  },

  'pressedDislike'(cardName, _id_) {
    let votes = VoteData.findOne({"name": Meteor.user().username}).votes;
    let u = UserData.findOne({name: cardName});
    UserData.update(
      {_id : u._id , "cards._id_" : _id_ } ,
                {$inc : {"cards.$.dislikes" : 1} }
    );
    if(votes.indexOf(_id_ + 1) < 0 || votes.indexOf(_id_) < 0) {
      VoteData.update({name: Meteor.user().username}, {$push: {votes: _id_}})
    }
  }

});
