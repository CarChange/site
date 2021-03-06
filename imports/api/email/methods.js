import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Accounts.emailTemplates.siteName = 'CarChange';
Accounts.emailTemplates.from = 'CarChange <naoresponda@carchange.com.br>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
    return `Bem vindo à CarChange, ${user.profile.nome.primeiro}`;
};

Accounts.emailTemplates.enrollAccount.text = (user, url) => {
    return 'Cadastro realizado com sucesso! Para ativar sua conta, clique no link abaixo: \n\n'
        + url;
};

Accounts.emailTemplates.resetPassword = {
    from() {
        return 'CarChange - Resetar Senha <naoresponda@carchange.com.br>';
    },
    subject() {
        return "[CarChange] Resetar a senha";
    },
    text(user, url) {
        return `Olá, ${user.profile.nome.primeiro}! Acesse o seguinte link para mudar sua senha:\n\n ${url}`
        + "\n\nCaso você não tenha solicitado mudança de senha, ignore este email.";
    }
}

Accounts.emailTemplates.verifyEmail = {
   subject() {
        return "[CarChange] Ative sua conta agora!";
   },
   text(user, url) {
        return `Olá, ${user.profile.nome.primeiro}! Verifique seu email ao clicar neste link:\n\n ${url}`;
   }
};

Meteor.methods({
    sendEmail: function(userEmail){
        Email.send({
            from: "CarChange <naoresponda@carchange.com.br>",
            to: userEmail,
            subject: "Chegou?",
            text: "Bem vindo :)",
        });
        //Invocar funcao callback com error, result ao chamar sendEmail.
    },
    'sendVerificationLink'() {
        let userId = Meteor.userId();
        if ( userId ){
            return Accounts.sendVerificationEmail( userId );
        }
        else
            throw new Meteor.Error(25, 'Não foi possível enviar o email de verificação.', "Verifique se o usuário está logado.");
    },
    'resetUserPassword'(userEmail) {
        let userId = Meteor.users.findOne({'emails.address':userEmail})._id;
        if ( userId ){
            return Accounts.sendResetPasswordEmail( userId );
        }
        else
            throw new Meteor.Error(25, 'Não foi possível enviar o email de mudança de senha.', "Verifique se o usuário está logado.");
    }
});
