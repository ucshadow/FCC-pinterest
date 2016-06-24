import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
  if(!user.username) {
    user.username = options.profile.name;
  }
  user.profile = options.profile;
  Meteor.call("addToUserData", user.username);
  Meteor.call("addToAvatarData", user.username);
  return user
});
