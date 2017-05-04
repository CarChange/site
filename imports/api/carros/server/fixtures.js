// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Carros } from '../carros.js';

Meteor.startup(() => {
    if (Carros.find()) {


        console.log("Consorcios de carros cadastrados.");
    }

});
