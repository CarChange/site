// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Pontos } from '../../api/pontos/pontos.js';

Meteor.startup(() => {
    if (Accounts.findUserByEmail("ad@min.com")) {

        var admin = {
            mail: "ad@min.com",
            password: "gartinhos"
        };
        Accounts.createUser(admin);
        admin = Accounts.findUserByEmail("ad@min.com");

        Roles.addUsersToRoles(admin._id, 'admin', Roles.GLOBAL_GROUP);
    }

});
