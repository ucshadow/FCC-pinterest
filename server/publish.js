import { UserData } from '../imports/api/userData'


Meteor.publish('userData', function votePublish() {
  return UserData.find();
});