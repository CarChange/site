import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Carros } from '/imports/api/carros/carros.js';
// import { Images } from '/imports/api/images/images.js';

import './mostraCarro.html';
import '/imports/ui/components/pagamento/pagamento.js';


// Template.mostraCarro.onCreated(function () {
//   var carro = Carros.findOne({});
//   this.subscribe("image", carro.imagem);
// });


Template.mostraCarro.helpers({
  carros() {
      return Carros.findOne({});
  },
  // imagem() {
  //   return Images.findOne({});
  // }
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
    "click .pagamento": function(event, template){
        event.preventDefault();

        carro = Carros.findOne({});

        var consorcio = {
          id: carro._id,
          description: carro.marca + " " + carro.modelo,
          amount: carro.valorParc,
        }
console.log(consorcio);
        Meteor.call("pagamentos.buyCar", consorcio, function(err, res){
          //Espera o future
          if(err)
          console.log(err);
          if (res)//espera o future voltar
          Router.go("/pagamento/"+res);
        });

        swal({
          title: "Redirecionando para o PagSeguro",
          text: "Aguarde por favor...",
          imageUrl: "../img/bx_loader.gif",
          imageClass: "img-resize-small",
          // closeOnConfirm: false,
          // showLoaderOnConfirm: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
        });
    }
});
