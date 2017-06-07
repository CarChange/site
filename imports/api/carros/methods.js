import { Meteor } from 'meteor/meteor';
import { Carros } from './carros.js';
import { check } from 'meteor/check';

Meteor.methods({
  'carros.insert' (carro){

      //verifica se pedido vem de um admin
      if(!Roles.userIsInRole(Meteor.userId(),['admin.cm','admin.super']))
        throw new Meteor.Error('Não Autorizado');

        check(carro,{
          marca : String,
          modelo : String,
          categoria : String,
          valorTotal : String,
          valorParc : String,
          numParc : String,
          imagem : String,
          creator : {
            createdAt : Date,
            adminId : String,
          }
        });

      Carros.insert(carro);
  },
  'carros.remove' (idCarro){
      //verifica se pedido vem de um admin
      if(!Roles.userIsInRole(Meteor.userId(),['admin.cm','admin.super']))
        throw new Meteor.Error('Não Autorizado');

      Carros.remove(idCarro);
  },
  'carros.update' (carro){
      if(!Roles.userIsInRole(Meteor.userId(),['admin.cm','admin.super']))
        throw new Meteor.Error('Não Autorizado');

        check(carro,{
          marca : String,
          modelo : String,
          categoria : String,
          valorTotal : String,
          valorParc : String,
          numParc : String,
          creator : {
            createdAt : Date,
            adminId : String,
          }
        });

        Carros.update(carro._id,{$set: carro});

  }
});
