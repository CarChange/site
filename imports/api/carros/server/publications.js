import { Meteor } from 'meteor/meteor';
import { Carros } from '../carros.js';

//Isso é um gato - MEOW
if(Meteor.isServer){
    Meteor.publish('carros', function carrosPublication() {
        return Carros.find({});
    });
}
