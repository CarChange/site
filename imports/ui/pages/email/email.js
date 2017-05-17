import { Email } from 'meteor/email';
import './email.html';

Template.email.events({
    "submit .mandaEmail": function(event, template){
        event.preventDefault();

        var userEmail = event.target.email.value;
        Meteor.call("sendEmail", userEmail, function(error, result){
            if(error){
                swal("Error do sendEmail via call", error);
            }
            if(result){
                swal("Sucesso!", "O email foi enviado.");
            }
        });
        event.target.email.value = "";
        Meteor.setTimeout(function(){
            event.target.email.value = userEmail;
        }, 200);
    }
});
