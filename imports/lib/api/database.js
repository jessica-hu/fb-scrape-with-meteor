import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';


export const PostData = new Mongo.Collection('post_reactions');
export const UserData = new Mongo.Collection('user_reactions');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('user_reactions', function userPublication(name) {
    return UserData.find({'name' : name});
  });
}
