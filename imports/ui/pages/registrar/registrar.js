import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './registrar.html';




Template.registrar.events({
  "submit .form-registrar": function(event){
     event.preventDefault();
     //get the captcha data
     var captchaData = grecaptcha.getResponse();

     //valida confirma senha
     if(event.target.senha.value === event.target.senha2.value){

       //constrói objeto para enviar para servidor(call)
       const user = {
         email: event.target.email.value,
         password: event.target.senha.value,
         profile: {nome:{primeiro: event.target.nome.value, ultimo: event.target.sobrenome.value }},
       }

       //Call pro servidor
       Meteor.call("users.insert", user, captchaData , function(error, result){

         //resetando captcha
         grecaptcha.reset();

         if(error){
           //pega msg de erros do users.insert
           swal(error.reason, error.details,'error');
         }
         if(result){
            //se conseguir criar
            swal("Sucesso!", "Registro realizado!");
            Meteor.loginWithPassword(user.email, user.password);
            Router.go('/tempadm');
         }
        });
     }else{
       swal("Erro", "Confirme a sua senha!", "error");
     }


  },
  "click .logout": function(event){

  }

});
