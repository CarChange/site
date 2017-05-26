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
    'click .resendVerificationLink' () {
        Meteor.call( 'sendVerificationLink', ( error, response ) => {
            if ( error ) {
                swal( error.reason, 'Opa! Email não enviado.' );
            } else {
                let email = Meteor.user().emails[ 0 ].address;
                swal( `Link de verificação enviado para ${ email }!`, 'success' );
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
    }
});
