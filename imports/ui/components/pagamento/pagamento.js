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
    produto: function() {
        console.log(this);
        var carro = {
            marca: this.marca,
            modelo: this.modelo,
            valor: parseFloat(this.valor).toFixed(2),
            categoria: this.categoria
        }
        return this;
    }
});

Template.pagamento.events({
    "submit .pagamento": function(event, template){

    }
});
