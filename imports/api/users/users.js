import { Meteor } from 'meteor/meteor';

export const Users = Meteor.users;

Users.allow({
  remove: function(userId, doc) {
    return Roles.userIsInRole(userId, "admin.super");
  }
})
