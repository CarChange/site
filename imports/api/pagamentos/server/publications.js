import { Meteor } from 'meteor/meteor';
import { Pagamentos } from '../pagamentos.js';

if(Meteor.isServer){
    Meteor.publish('pagamentos', function pagamentosPublication() {
        return Pagamentos.find({});
    });
}
