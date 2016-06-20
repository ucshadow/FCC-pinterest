import { Mongo } from 'meteor/mongo';

export const UserData = new Mongo.Collection('userData');


// {name: "SHADOW", cards: [{url: "https://pbs.twimg.com/profile_images/418361941510209536/e6V6Yak3.jpeg", likes: 21, dislikes: 2, text: "check this out!"}]}