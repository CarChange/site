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
         swal("Deu ruim","Errrrrrrrrrrou email ou senha",'error');
       }else{
         swal("Sucesso","Você logou nessa joça");
         Router.go('admhomeass');
       }
    });
  }
});
