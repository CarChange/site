// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Pontos } from '../../api/pontos/pontos.js';

Meteor.startup(() => {
    if (Meteor.users.find().count() === 0) {

        var admin = {
            username: "admin",
            mail: "ad@min.com",
            password: "gartinhos"
        };
        Accounts.createUser(admin);
        admin = Accounts.findUserByUsername("admin");

        Roles.addUsersToRoles(admin._id, 'admin', Roles.GLOBAL_GROUP);

        var user = {
            username: "username",
            mail: "e@mail.com",
            password: "password"
        };
        Accounts.createUser(user);
        user = Accounts.findUserByUsername("username");

        Roles.addUsersToRoles(user._id, ['um-role-que-nao-existe', 'user'], Roles.GLOBAL_GROUP);

        console.log(Meteor.users.find().count() + " eh o admin e o user");
    }

});
