import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Carros } from '/imports/api/carros/carros.js';

import './mostraCarro.html';
import '/imports/ui/components/pagamento/pagamento.js';


Template.mostraCarro.helpers({
  carros() {
      return Carros.findOne({});
  },
});


Template.mostraCarro.events({
    'click .resendVerificationLink' ( event, template ) {
        Meteor.call( 'sendVerificationLink', ( error, response ) => {
            if ( error ) {
                swal( error.reason, 'Opa!' );
            } else {
                let email = Meteor.user().emails[ 0 ].address;
                swal( `Link de verificação enviado para ${ email }!`, 'success' );
            }
        });
    },
});
