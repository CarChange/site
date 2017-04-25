import { Meteor } from 'meteor/meteor';
import { Pontos } from '../pontos.js';

Meteor.publish('pontos', function pontosPublication() {
    return Pontos.find();
});
