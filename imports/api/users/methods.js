//nao usando ainda
import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';
import { check } from 'meteor/check';

Meteor.methods({
  'users.insert'(user) {
    check(user, {
      email: String,
      senha: String,
      profile: { nome: { primeiro: String, ultimo: String } },
    });

      const userExists = Accounts.findUserByEmail(user.email);

      if (!userExists) {
        const userId = Accounts.createUser({ email, senha, profile });
        Roles.addUsersToRoles(userId, 'user');
      }
  },
});
