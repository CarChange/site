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

}
