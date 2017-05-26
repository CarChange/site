import './pagamento.html';

// imports

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
        // if(Meteor.user().telefone) {
        //     return {
        //         ddd: Meteor.user().telefone.ddd,
        //         num: Meteor.user().telefone.numero
        //     }
        // }
        // else
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
        return this.marca + " " + this.modelo;
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

        var payment = {
            refId: Meteor.user().emails[0].address, // TODO Mudar URGENTEMENTE o ref ID
            data: new Date(),
            userId: Meteor.userId(),
            efetuado: false,
            carrinho: {
                produtoId: this._id,
                descricao: { // TODO Mudar para desc do produto
                    marca: this.marca,
                    modelo: this.modelo,
                    categoria: this.categoria
                },
                valor: this.valorParc,
                quantidade: 1 // TODO Mudar para ser programático
            }
        }
        // console.log(this);

        Meteor.call("pagamentos.insert", payment);

        swal("PagSeguro", "Uma nova aba com os dados do pagamento foi aberta. Após a confirmação, entraremos em contato. Grato!");
    }
});
