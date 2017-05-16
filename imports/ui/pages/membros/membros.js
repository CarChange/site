import './membros.html';
import '/imports/ui/pages/loading/loading.js';
Template.membros.helpers({
    dataCadastro: function() {
        var data = Meteor.user().profile.dataCadastro;
        return moment(data).format("DD/MM/YYYY");
    },
    authInProcess: function() {
      return Meteor.loggingIn();
    }
});
