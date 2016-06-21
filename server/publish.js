import { UserData } from '../imports/api/userData';
import { AvatarsDB } from '../imports/api/avatarsDB'


Meteor.publish('userData', function userPublish() {
  return UserData.find();
});

Meteor.publish('avatars', function usersPublish() {
  return AvatarsDB.find();
});

