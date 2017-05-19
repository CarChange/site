import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';
import { check } from 'meteor/check';
import { EJSON } from 'meteor/ejson';  // Meteor.call usa pra mais de um argumento

Accounts.emailTemplates.siteName = 'CarChange';
Accounts.emailTemplates.from = 'CarChange <naoresponda@carchange.com.br>';
Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Bem vindo à CarChange, ${user.profile.nome.primeiro}`;
};
Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'Cadastro realizado com sucesso! Para ativar sua conta, clique no link abaixo: \n\n'
    + url;
};
Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'CarChange - Resetar Senha <naoresponda@carchange.com.br>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Ative sua conta agora!";
   },
   text(user, url) {
      return `Olá, ${user}! Verifique seu email ao clicar neste link:\n\n ${url}`;
   }
};

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
      Roles.addUsersToRoles(userId, 'user');
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
  'users.changeRole'(roles) {
      if(Roles.userIsInRole(this.userId, role, Roles.GLOBAL_GROUP))
        Roles.removeUsersFromRoles(this.userId, roles, Roles.GLOBAL_GROUP);
      else
        Roles.addUsersToRoles(this.userId, role, Roles.GLOBAL_GROUP);
  },
  'sendVerificationLink'() {
      let userId = Meteor.userId();
      if ( userId )
        return Accounts.sendVerificationEmail( userId );
      else
        throw new Meteor.Error(25, 'Não foi possível enviar o email de verificação.', "Verifique se o usuário está logado.");

  }
});
