import './pagamento.html';
import '/imports/ui/pages/loading/loading.js';
Template.pagamento.helpers({
    // TODO pegar referências do produto e do cliente
    userEmail: function() {
        if(!Meteor.userId())
            return "faz_login.com";
        return Meteor.user().emails[0].address;
    },
    userNome: function() {
        if(!Meteor.userId())
            return "faz login";
        var nome = Meteor.user().profile.nome;
        return nome.primeiro + " " + nome.ultimo;
    },
    telefone: function() {
        // TODO Adicionar telefone ao user
        if(Meteor.user().telefone) {
            return {
                ddd: Meteor.user().celular.ddd,
                num: Meteor.user().celular.numero
            }
        }
        else
        return {
            ddd: undefined,
            num: undefined
        }
    },
    produto: function() {
        // TODO transformar desc em String
        return this;
    },
    descricao: function() {
        if (this.marca || this.modelo)
          return this.marca + " " + this.modelo;
        else {
          return "Taxa anual do Clube CarChange";
        }
    },
    refId: function() {
        return Meteor.user().emails[0].address;// + new Date().getTime(); // TODO pegar tempo do pagamento.
    }
});

Template.pagamento.events({
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
    "submit .pagamento": function(event, template){
        event.preventDefault();

        Meteor.call("pagamentos.buySub", function(err, res){
          //Espera o future
          if(err)
          console.log(err);
          if (res)//espera o future voltar
          Router.go("/pagamento/"+res);
        });
        swal('hello World');
        swal({
          title: "Redirecionando para o PagSeguro",
          text: "Aguarde por favor...",
          type: "info",
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
        });


    }
});
