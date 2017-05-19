import { Meteor } from 'meteor/meteor';

// in server/publish.js
//mudar publish para situações

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})
