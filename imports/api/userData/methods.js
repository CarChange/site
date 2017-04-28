//nao usando ainda
import { Meteor } from 'meteor/meteor';
import { Users } from './userData.js';
import { check } from 'meteor/check';
Meteor.methods({
  'users.insert'(users) {
    check(users, [{
      email: String,
      password: String,
      profile: { name: { first: String, last: String } },
      roles: [String],
    }]);

    users.forEach(({ email, password, profile, roles }) => {
      const userExists = Accounts.findUserByEmail(email);

      if (!userExists) {
        const userId = Accounts.createUser({ email, password, profile });
        Roles.addUsersToRoles(userId, roles, <my whatever global role group>);
      }
    });
  },
});
