import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './registrar.html';




Template.registrar.events({
  "submit .form-registrar": function(event){
     event.preventDefault();

     //valida confirma senha
     if(event.target.senha.value === event.target.senha2.value){

       //constrói objeto para enviar para servidor(call)
       const user = {
         email: event.target.email.value,
         password: event.target.senha.value,
         profile: {nome:{primeiro: event.target.nome.value, ultimo: event.target.sobrenome.value }},
       }

       //Call pro servidor
       Meteor.call("users.insert", user, function(error, result){
         if(error){
           //para erros indefinidos
           console.log("erro disso aqui: ", error);
         }
         if(result){
            //se conseguir criar
            swal("Sucesso!", "Registro realizado!");
            Meteor.loginWithPassword(user.email, user.password);
            Router.go('/');
         }else{
            //se email repetido
            swal("Erro", "Email já registrado!", "error");
         }
       });
     }else{
       swal("Erro", "Conforme a sua senha!", "error");
     }


  },
  "click .logout": function(event){

  }

});
