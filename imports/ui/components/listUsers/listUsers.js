import './listUsers.html';
import '../userShow/userShow.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users.js';

Template.listUsers.helpers({
  users() {
      return Users.find({});
  },
});

Template.listUsers.events({
  "click #foo": function(event, template){

  }
});
