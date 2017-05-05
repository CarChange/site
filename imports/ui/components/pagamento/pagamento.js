import './pagamento.html';

// imports

Template.pagamento.helpers({
    // TODO pegar referências do produto e do cliente
    userEmail: function() {
        return Meteor.user().emails[0].address;
    },
    userNome: function() {
        var nome = Meteor.user().profile.nome;
        return nome.primeiro + " " + nome.ultimo;
    }
});

Template.pagamento.events({
    "submit .pagamento": function(event, template){

    }
});
