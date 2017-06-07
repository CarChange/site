import './pagamento.html';
import '/imports/ui/pages/loading/loading.js';
Template.pagamento.helpers({
    // TODO pegar referências do produto e do cliente
    // loading: function() {
    //   return Template.instance().loading.get();
    // },
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
Template.pagamento.onCreated( () => {
  this.loading = new ReactiveVar(false);
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
        //Inicializar a função com o e-mail e token

        //Tela de loading
        // console.log(this.loading);
        // template.loading.set(true);

        //
        // var payment = {
        //     refId: Meteor.user().emails[0].address, // TODO Mudar URGENTEMENTE o ref ID
        //     data: new Date(),
        //     userId: Meteor.userId(),
        //     efetuado: false,
        //     carrinho: {
        //         produtoId: this._id,
        //         descricao: { // TODO Mudar para desc do produto
        //             marca: this.marca,
        //             modelo: this.modelo,
        //             categoria: this.categoria
        //         },
        //         valor: this.valorParc,
        //         quantidade: 1 // TODO Mudar para ser programático
        //     }
        // }
        // // console.log(this);

        Meteor.call("pagamentos.insert", function(err, res){
          if(err)
            console.log(err);
          if (res)
            Router.go("/pagamento/"+res);
        });

        swal("PagSeguro", "Uma nova aba com os dados do pagamento foi aberta. Após a confirmação, entraremos em contato. Grato!");
    }
});
