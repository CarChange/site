import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users.js';

import './registrar.html';


Template.registrar.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.registrar.events({
  "click .form-registrar": function(event, template){
     event.preventDefault();

     //valida confirma senha
     if(event.target.senha.value === event.target.senha2.value){

       //constrói objeto para enviar para servidor(call)
       const user = {
         email: event.target.email.value,
         senha: event.target.senha.value,
         profile: {nome:{primero: event.target.nome.value, ultimo: event.target.sobrenome.value }},
       }

       //Call pro servidor
       Meteor.call("meteorMethod", user, function(error, result){
         if(error){
           console.log("erro disso aqui: ", error);
         }
         if(result){
            console.log("deu certo olha: ", result);
         }
       });
     }else{
       swal("Erro", "Senhas diferentes, favor redigitar!", "error");
     }
  }

});
