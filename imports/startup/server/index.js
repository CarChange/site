// Import server startup through a single index entry point
import './register-api.js';
import './fixtures.js';

if(Meteor.isServer){
  Meteor.startup(function() {
      reCAPTCHA.config({
          privatekey: '6Lexwh8UAAAAAFYoucPNqDgvwZLcnVBtrVPWVdPy'
      });
  });
}
