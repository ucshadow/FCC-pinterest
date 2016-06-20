import { UserData } from '../imports/api/userData'
import { VoteData } from '../imports/api/voteData'


Meteor.publish('userData', function userPublish() {
  return UserData.find();
});

Meteor.publish('voteData', function votePublish() {
  return VoteData.find();
});