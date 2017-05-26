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

Template.membros.events({
    'click .resendVerificationLink' ( event, template ) {
        Meteor.call( 'sendVerificationLink', ( error, response ) => {
            if ( error ) {
                swal( error.reason, 'Opa! ' );
            } else {
                let email = Meteor.user().emails[ 0 ].address;
                swal( `Link de verificação enviado para ${ email }!`, 'success' );
            }
        });
    }
});
