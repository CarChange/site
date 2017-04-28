import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

// Import needed templates
import '/imports/ui/layouts/index/index.js';
//import '/imports/ui/pages/carrinho/carrinho.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/loading/loading.js';
import '/imports/ui/pages/login/login.js';
import '/imports/ui/pages/loja/loja.js';
import '/imports/ui/pages/not-found/not-found.js';
import '/imports/ui/pages/pontoVirtual/pontoVirtual.js';
import '/imports/ui/pages/registrar/registrar.js';
import '/imports/ui/pages/sobre/sobre.js';
import '/imports/ui/pages/vantagens/vantagens.js';
import '/imports/ui/pages/planos/planos.js';
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

Router.route("/sobre");

Router.route("/registrar");

Router.route("/loja");

Router.route("/login");

Router.route("/vantagens");

Router.route("/planos");

Router.route("/pontoVirtual", {
  waitOn:function(){
    return Meteor.subscribe('pontos');
  },
});
