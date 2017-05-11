import './membros.html';

Template.membros.helpers({
    dataCadastro: function() {
        var data = Meteor.user().profile.dataCadastro;
        return moment(data).format("DD/MM/YYYY");
    }
});
