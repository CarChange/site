import { Router } from 'meteor/iron:router';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/carrinho/carrinho.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/loja/loja.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/ponto/ponto.js';
import '../../ui/pages/register/register.js';
// Set up all routes in the app
Router.configure({
  layoutTemplate: 'App_body',
});

Router.route("/", {
  name: "home",
  template:"home",
});

Router.route("/register", {
  name:"register",
  template:"register",
  waitOn:function(){
    subscriptions
  },
  data:function(){
     dataFunction
  },
  onBeforeAction:function(){

  },
  onAfterAction:function(){

  },
  onRun:function(){

  },
  onReRun:function(){

  }
});
