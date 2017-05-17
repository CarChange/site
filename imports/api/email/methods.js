import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Meteor.methods({
    sendEmail: function(userEmail){
        console.log("user email: " + userEmail);
        try {
            Email.send({
                from: "naoresponda@mg.carchange.com.br",
                to: userEmail,
                subject: "Chegou?",
                text: "Tô saindo então",
            });
            console.log("Email enviado?");
        } catch (e) {
            console.log("catch do email em methods.js:");
            console.log(e);
        }
    }
});
