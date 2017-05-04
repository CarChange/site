// Import client startup through a single index entry point
import './routes.js';
import './accounts-config.js';

if(Meteor.isClient){
  Meteor.startup(function() {
      reCAPTCHA.config({
          publickey: '6Lf6-R8UAAAAAH7XBcGz2ZtAqts2_555PGo53z6B',
          hl: 'pt-BR' // optional display language
      });
  });
}
