// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Pontos } from '../../api/pontos/pontos.js';

Meteor.startup(() => {

    if ((adm = Accounts.findUserByEmail("ad@min.com")) != undefined) {
        Meteor.users.remove({_id: adm._id});
    }
    var admin = {
        email: "ad@min.com",
        password: "gartinhos",
        profile: {
            nome: {
                primeiro: "ad",
                ultimo: "minho"
            }
        }
    };
    Accounts.createUser(admin);
    admin = Accounts.findUserByEmail("ad@min.com");

    Roles.addUsersToRoles(admin._id, 'super-admin', Roles.GLOBAL_GROUP);

    if(admin) {
        console.log("Admin cadastrado.");
    }
    else {
        console.log("Nao foi possivel cadastrar o admin.");
    }

});
