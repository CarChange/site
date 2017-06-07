import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Carros } from '/imports/api/carros/carros.js';
import { Images } from '/imports/api/images/images.js';

import './mostraCarro.html';
import '/imports/ui/components/pagamento/pagamento.js';


Template.mostraCarro.onCreated(function () {
  var carro = Carros.findOne({});
  this.subscribe("image", carro.imagem);
});


Template.mostraCarro.helpers({
  carros() {
      return Carros.findOne({});
  },
  imagem() {
    return Images.findOne({});
  }
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
