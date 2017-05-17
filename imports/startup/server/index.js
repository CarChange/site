// Import server startup through a single index entry point
import './register-api.js';
import './fixtures.js';

if(Meteor.isServer){
  Meteor.startup(function() {
      //configuração reCAPTCHA servidor
      reCAPTCHA.config({
          privatekey: '6Lf6-R8UAAAAAFWJpW4OOPMLz3qCujboWIzHSIc5'
      });

      //Setando o MAIL_URL TODO Configurar como environment variable
      smtp = {
          username: 'postmaster@mg.carchange.com.br',
          password: 'd5f28ee257fa193da9da6bed9bfeb181',
          server: 'smtp.mailgun.org',
          port: 465 //alternar entre 465 (SSL) e 587 (TLS)
      }
      process.env.MAIL_URL = "smtps://" + encodeURIComponent(smtp.username) + ":" + encodeURIComponent(smtp.password) + "@" + encodeURIComponent(smtp.server) + ":" + smtp.port;
  });
}
