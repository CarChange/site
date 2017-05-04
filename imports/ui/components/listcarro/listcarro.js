import './listcarro.html';
import '../carro/carro.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Carros } from '/imports/api/carros/carros.js';

Template.listcarro.helpers({
  carros() {
      return Carros.find({});
  },
});
