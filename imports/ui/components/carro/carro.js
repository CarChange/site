import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './carro.html';

Template.carro.helpers({
    carro: function() {
        return this;
    },
    editar: function() {
      return Router.current().route.getName() == "editarConsorcio";
    }
});

Template.carro.events({
  "click .carro": function(event, template){
    Router.go("/mostraCarro/"+this._id);
  },
  "click .remove": function() {
    Meteor.call("carros.remove", this._id);
  },
  "click .editar": function() {
    Router.go("/admin/cadastroConsorcio/"+this._id);
  }
});
