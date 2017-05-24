import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';
import { check } from 'meteor/check';
import { EJSON } from 'meteor/ejson';  // Meteor.call usa pra mais de um argumento

Meteor.methods({
  'users.insert'(user, captchaData) {

    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData); //MUDAR localhost PARA this.connection.clientAddress QUANDO DER DEPLOY

    if (!verifyCaptchaResponse.success)
        throw new Meteor.Error(422, 'Erro no Captcha!', 'Favor resolver o Captcha!');

         //} else
            //console.log('reCAPTCHA verification passed!');

    check(user, {
      email: String,
      password: String,
      profile: { nome: { primeiro: String, ultimo: String }, dataCadastro: Date },
    });


    const userExists = Accounts.findUserByEmail(user.email);

    if (!userExists) {
      const userId = Accounts.createUser(user);
      Roles.addUsersToRoles(userId, 'user.viewer');
      console.log("Usuário registrado (" + user.email + ")");
      return true;
    }else{
      throw new Meteor.Error(23,'Email já existente!',"Favor escolher outro Email.");
    }

    /* createUser com callback AINDA não é permitido no servidor.

    Accounts.createUser(user, function(error){
      if (error)
        throw new Meteor.Error(23,'Email já existente!',"Favor escolher outro Email.");
    });
    */
  },
  'users.remove'() {

  },

  'users.changeRole'(userId,role) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser || !Roles.userIsInRole(loggedInUser,'admin.super')) {
      throw new Meteor.Error(403, "Access denied")
    }
    Roles.setUserRoles(userId, role);
  },
});
