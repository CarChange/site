import { Meteor } from 'meteor/meteor';
import { Carros } from './carros.js';
import { check } from 'meteor/check';

Meteor.methods({
  'carros.insert' (carro){

      //verifica se pedido vem de um admin
      if(!Roles.userIsInRole(Meteor.userId(),'admin'))
        throw new Meteor.Error('Não Autorizado');

        check(carro,{
          marca : String,
          modelo : String,
          categoria : String,
          valor : Float,
          creator{
            createdAt : String,
            adminId : String,
          }
        });

      Carros.insert(carro);
  },
  'carros.remove' (idCarro){
      //verifica se pedido vem de um admin
      if(!Roles.userIsInRole(Meteor.userId(),'admin'))
        throw new Meteor.Error('Não Autorizado');

      Carros.remove(idCarro);
  }
  'carros.update' (carro){
    if(!Roles.userIsInRole(Meteor.userId(),'admin'))
      throw new Meteor.Error('Não Autorizado');

      check(carro,{
        _id : String,
        marca : String,
        modelo : String,
        categoria : String,
        valor : Float,
        creator{
          createdAt : String,
          adminId : String,
        }
      });

      Carros.update(carro._id,{$set: carro});

  }
});
