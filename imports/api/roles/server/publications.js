import { Meteor } from 'meteor/meteor';

// in server/publish.js
Meteor.publish(null, function (){
  return Meteor.roles.find({})
})
