import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './carro.html';
import '../pagamento/pagamento.js';

Template.carro.helpers({
    carro: function() {
        return this;
    }
});

Template.carro.events({
  "click .carro": function(event, template){
    Router.go("/mostraCarro/"+this._id);
  }
});
