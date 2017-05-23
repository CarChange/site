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
          let projection = { limit: 5, sort: {"profile.nome.primeiro" : 1}};

          if ( search ) {
            //JavaScript regular expression - não distingue cases
            let regex = new RegExp( search, 'i' );

            query = {
              "profile.nome.primeiro": regex
            };
            projection.limit = 5;
          }
          return Users.find(query,projection);
        }else {
          //Redirecionar para não autorizado
          this.stop();
          return;
        }
      });

      // Meteor.publish('user', function userPublication() {
      //   if(this.userId){
      //       console.log("entrou no findOne do user");
      //       return Users.findOne({_id: id },{fields : {profile:1}});
      //   }else {
      //     //Redirecionar para não autorizado
      //     this.stop();
      //     return;
      //   }
      // });

}
