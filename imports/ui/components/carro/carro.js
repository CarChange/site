import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './carro.html';
import '../pagamento/pagamento.js';

Template.carro.helpers({
    carro: function() {
        return this;
    }
});
