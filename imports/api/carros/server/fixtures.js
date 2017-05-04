// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Carros } from '../carros.js';

Meteor.startup(() => {
    // if (Carros.find({}).count() == 0) {
    //
    //     Meteor.call("carros.insert", {});
    //
    //     console.log("Consorcios de carros cadastrados.");
    // }

});
