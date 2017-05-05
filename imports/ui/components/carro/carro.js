import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './carro.html';

Template.carro.helpers({
    carro: function() {
        return this;
    }
});

Template.carro.events({
  "click .carro": function(event, template){
    Router.go("/mostraCarro/"+this._id);
},
  "click .remove": function() {
    Meteor.call("carros.remove", this._id);
  }
});
