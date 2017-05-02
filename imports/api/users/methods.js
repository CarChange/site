//nao usando ainda
import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';
import { check } from 'meteor/check';

Meteor.methods({
  'users.insert'(user) {
    check(user, {
      email: String,
      password: String,
      profile: { nome: { primeiro: String, ultimo: String } },
    });

    const userExists = Accounts.findUserByEmail(user.email);

    if (!userExists) {
      const userId = Accounts.createUser(user);
      Roles.addUsersToRoles(userId, 'user');
      return true;
    }else{
      return false;
    }
  },
});
