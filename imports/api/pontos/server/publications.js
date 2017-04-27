//Eh importado por register-api.js APENAS. Uma vez no server, todos tem acesso aos subscriptions

import { Meteor } from 'meteor/meteor';
import { Pontos } from '../pontos.js';

Meteor.publish('pontos', function pontosPublication() {
    return Pontos.find();
});
