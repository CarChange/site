import './membros.html';
import '/imports/ui/pages/loading/loading.js';
import '/imports/ui/components/pagamento/pagamento.js';

Template.membros.helpers({
    dataCadastro: function() {
        var data = Meteor.user().createdAt;
        return moment(data).format("DD/MM/YYYY");
    },
    authInProcess: function() {
      return Meteor.loggingIn();
    },
    produtoClube: function() {
      var produto = {
        _id : '123',
        valorParc : parseFloat(180).toFixed(2),//verificar valor da parcela
      }
      return produto;
    }
});

Template.membros.events({
    'click .resendVerificationLink' () {
        Meteor.call( 'sendVerificationLink', ( error, response ) => {
            if ( error ) {
                swal( error.reason, 'Opa! Email não enviado.' );
            } else {
                let email = Meteor.user().emails[ 0 ].address;
                swal({
                  text: `Link de verificação enviado para ${ email }!`,
                  type: 'success'
                });
            }
        });
    },
    'click .resetPassword' (event, template) {
        let email = Meteor.user().emails[ 0 ].address;
        Meteor.call("resetUserPassword", email, function(error, result){
            if(error){
                swal( error.reason, 'Opa! Email não enviado.' );
            }
            if(result){
                swal( `Link de mudança de senha enviado para ${ email }!`, 'success' );
            }
        });
    },
    "click .pagamento": function(event, template){
        event.preventDefault();

        Meteor.call("pagamentos.buySub", function(err, res){
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
