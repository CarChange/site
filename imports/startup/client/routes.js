import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';

// Import needed templates
import '/imports/ui/layouts/index/index.js';
import '/imports/ui/layouts/adm/adm.js';
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
import '/imports/ui/pages/membros/membros.js';
import '/imports/ui/pages/consorcio/consorcio.js'
import '/imports/ui/pages/cadastroConsorcio/cadastroConsorcio.js'
import '/imports/ui/pages/admconsass/admconsass.js';
import '/imports/ui/pages/admhome/admhome.js';
import '/imports/ui/pages/admhomeass/admhomeass.js';
import '/imports/ui/pages/admhomeparc/admhomeparc.js';
import '/imports/ui/pages/mostraCarro/mostraCarro.js';
import '/imports/ui/pages/email/email.js';
import '/imports/ui/pages/admUserDash/admUserDash.js';

membrosController = RouteController.extend({
  onBeforeAction: function () {
    // do some login checks or other custom logic
    if(!Roles.userIsInRole(Meteor.userId(),['user.viewer','user.client','user.vendor','partner','admin.cm','admin.super'])){
      this.redirect('login');
    }
    this.next();
  }
});

// Set up fixed Layout
Router.configure({
  layoutTemplate: 'transparente',
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

Router.route("/membros", {
  name:"membros",
  template:"membros",
  controller: "membrosController",
});

Router.route("/loja/consorcio", {
  name:"consorcio",
  template:"consorcio",
  controller: "membrosController",
  waitOn:function(){
    return Meteor.subscribe('carros');
  },
});



Router.route("/admin/cadastroConsorcio", {
  name:"cadastroConsorcio",
  template:"cadastroConsorcio",
  controller: "membrosController",
  waitOn:function(){
    return Meteor.subscribe('carros');
  },
});


Router.route("/pontoVirtual", {
    waitOn:function(){
        return Meteor.subscribe('pontos');
    },
});

Router.route("/admin/permissoes", {
    name: "admUserDash",
    template: "admUserDash",
    controller: "membrosController",
    waitOn:function(){
        //return Meteor.subscribe('users');
    },
});

// Router.route("/admhomeass",
//   function () {
//     this.layout('Adm_body');
//     this.render('admhomeass');
// });
//
// Router.route("/admhomeparc",
//   function () {
//     this.layout('Adm_body');
//     this.render('admhomeparc');
// });
//
 Router.route("/admin",{
 name: "admhome",
 template: "admhome",
 controller: "membrosController",
 });
//
// Router.route("/admconsass",
//   function () {
//     this.layout('Adm_body');
//     this.render('admconsass');
// });

Router.route("/mostraCarro/:_id", {
  template:"mostraCarro",
  waitOn:function(){
    return Meteor.subscribe("carro", this.params._id);
  },
});

Router.route("email");
