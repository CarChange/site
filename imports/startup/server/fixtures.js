// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Pontos } from '../../api/pontos/pontos.js';

Meteor.startup(() => {
    //cria todos os roles
    if(Roles.getAllRoles().count() == 0){
      console.log("Criando roles...OK");
      Roles.createRole('admin.super');
      Roles.createRole('admin.cm');
      Roles.createRole('user.viewer');
      Roles.createRole('user.vendor');
      Roles.createRole('user.client');
      Roles.createRole('partner');
    }



    if ((adm = Accounts.findUserByEmail("carchange@carchange.com.br")) != undefined) {
        Meteor.users.remove({_id: adm._id});
    }
    var admin = {
        email: "carchange@carchange.com.br",
        password: "gartinhos",
        profile: {
            nome: {
                primeiro: "CarChange",
                ultimo: "Consorcios"
            },
            dataCadastro: new Date(2017, 4, 3)    //mês varia de 0 a 11
        }
    };
    Accounts.createUser(admin);
    admin = Accounts.findUserByEmail("carchange@carchange.com.br");

    Roles.addUsersToRoles(admin._id, 'admin.super');

    if(admin) {
        console.log("Admin cadastrado.");
    }
    else {
        console.log("Nao foi possivel cadastrar o admin.");
    }
});
