import { Meteor } from 'meteor/meteor';
import { Carros } from './carros.js';
import { check } from 'meteor/check';

Meteor.methods({
  'carros.insert':function(carro){

      //verifica se pedido vem de um admin
      if(!Roles.userIsInRole(Meteor.userId(),'admin')
        throw new Meteor.Error('Não Autorizado');

      //check(carros,{alguma coisa});

      Carros.insert(carro);
  }
});
