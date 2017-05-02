import './pontoAdmin.html';
import './user.js';
import { Users } from '/imports/api/users/users.js';
import { Meteor } from 'meteor/meteor';


Template.body.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  Meteor.subscribe("users");
});

Template.pontoAdmin.helpers({
  users() {
      return Users.find({});
  },

});
