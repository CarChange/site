import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Carros } from '/imports/api/carros/carros.js';

import './mostraCarro.html';


Template.mostraCarro.helpers({
  carros() {
      return Carros.findOne({});
  },
});


Template.mostraCarro.events({

});
