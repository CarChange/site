import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';
import { check } from 'meteor/check';
import { EJSON } from 'meteor/ejson';  // Meteor.call usa pra mais de um argumento

Meteor.methods({
  'users.insert'(user, captchaData) {

    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha('localhost', captchaData); //MUDAR localhost PARA this.connection.clientAddress QUANDO DER DEPLOY

    if (!verifyCaptchaResponse.success)
        throw new Meteor.Error(422, 'Erro no Captcha!', 'Favor resolver o Captcha!');

         //} else
            //console.log('reCAPTCHA verification passed!');

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
      throw new Meteor.Error(23,'Email já existente!',"Favor escolher outro Email.");
    }

    /* createUser com callback AINDA não é permitido no servidor.

    Accounts.createUser(user, function(error){
      if (error)
        throw new Meteor.Error(23,'Email já existente!',"Favor escolher outro Email.");
    });
    */
  },
});
