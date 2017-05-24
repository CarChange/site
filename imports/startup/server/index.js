// Import server startup through a single index entry point
import './register-api.js';
import './fixtures.js';

if(Meteor.isServer){
  Meteor.startup(function() {
      //configuração reCAPTCHA servidor
      reCAPTCHA.config({
          privatekey: '6Lf6-R8UAAAAAFWJpW4OOPMLz3qCujboWIzHSIc5'
      });
  });

    //Teste para tentar fazer a verificação de email:
    (function () {
        "use strict";

        Accounts.urls.resetPassword = function (token) {
            return Meteor.absoluteUrl('reset-password/' + token);
        };

        Accounts.urls.verifyEmail = function (token) {
            return Meteor.absoluteUrl('verify-email/' + token);
        };

        Accounts.urls.enrollAccount = function (token) {
            return Meteor.absoluteUrl('enroll-account/' + token);
        };

    })();
}
