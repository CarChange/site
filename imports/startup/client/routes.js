import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

// Import needed templates
import '../../ui/layouts/body/body.js';
//import '../../ui/pages/carrinho/carrinho.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/loading/loading.js';
//import '../../ui/pages/login/login.js';
//import '../../ui/pages/loja/loja.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/ponto/ponto.js';
import '../../ui/pages/register/register.js';

// Set up fixed Layout
Router.configure({
  layoutTemplate: 'App_body',
  notFoundTemplate: 'App_notFound',
  loadingTemplate: 'loading',
});
// Set up all routes in the app
Router.route("/", {
  name: "home",
  template:"home",

});

Router.route("/register", {
  name:"register",
  template:"register",
});

Router.route("/pontoVirtual", {
  name:"pontoVirtual",
  template:"ponto",
  waitOn:function(){
    Meteor.subscribe('pontos');
  },
});
