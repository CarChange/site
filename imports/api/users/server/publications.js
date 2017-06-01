import { Meteor } from 'meteor/meteor';
import { Users } from '../users.js';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
//Isso é um gato - MEOW
if(Meteor.isServer){
      Meteor.publish('users', function (search) {
        if(Roles.userIsInRole(this.userId,'admin.super')){
          check( search, Match.OneOf( String, null, undefined ) );

          let query      = {};
          let projection = { limit: 10, sort: {"profile.nome.primeiro" : 1}};

          if ( search ) {
            //JavaScript regular expression - não distingue cases
            let regex = new RegExp( search, 'i' );

            query = {
              $or: [
                {"profile.nome.primeiro": regex},
                {"profile.nome.ultimo": regex},
                {"emails.0.address": regex}
              ]
            };
            projection.limit = 10;
          }
          return Users.find(query,projection);
        }else {
          //Redirecionar para não autorizado
          this.stop();
          return;
        }
      });

      Meteor.publish('singleUser' , function (userId) {
            return Users.find({_id: userId },{fields : {profile:1}});
      });

}
