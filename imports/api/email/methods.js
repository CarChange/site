import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
    sendEmail: function(userEmail){
        Email.send({
            from: "CarChange <naoresponda@carchange.com.br>",
            to: userEmail,
            subject: "Chegou?",
            text: "Bem vindo :)",
        });
        //Invocar funcao callback com error, result ao chamar sendEmail.
    }
});
