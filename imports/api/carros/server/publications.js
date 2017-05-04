import { Meteor } from 'meteor/meteor';
import { Users } from '../carros.js';

//Isso é um gato - MEOW
if(Meteor.isServer){
    Meteor.publish('carros', function carrosPublication() {
        return Carros.find({});
    });
}
