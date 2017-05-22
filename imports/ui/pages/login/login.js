import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './login.html';


Template.login.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.login.events({
  "submit .form-login": function(event){
    event.preventDefault();
    var email = event.target.email.value;
    var senha = event.target.senha.value;

    Meteor.loginWithPassword(email, senha, function(err){
       if(err){
         swal("Erro","Email ou Senha incorretos!",'error');
       }else{
         swal("Sucesso","Você está logado!");
         if(Roles.userIsInRole(Meteor.userId(),['user.viewer','user.client','user.vendor','partner']))
          Router.go('membros');
         else if(Roles.userIsInRole(Meteor.userId(),['admin.cm','admin.super']))
          Router.go('admhome');
       }
    });
  }
});
