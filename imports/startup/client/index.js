// Import client startup through a single index entry point

import './routes.js';
import './accounts-config.js';
if(Meteor.isClient){
  Meteor.startup(function() {
      reCAPTCHA.config({
          publickey: '6Lexwh8UAAAAAKej41dKKbr2hBWBiTFuaOb60AnN',
          hl: 'pt-BR' // optional display language
      });
  });
}
