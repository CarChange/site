import { Meteor } from 'meteor/meteor';
import { Users } from '../users.js';

//Isso é um gato - MEOW
if(Meteor.isServer){
  if(this.user){

    var id = this.userId();

      Meteor.publish('users', function usersPublication() {
          if(Roles.userIsInRole(id,'user')){
            return Users.findOne({_id: id },{fields : {profile:1}});
          }else if(Roles.userIsInRole(id,'admin')){
            return Users.find({});
          }
      });

      Meteor.publish('user', function usersPublication() {
          if(Roles.userIsInRole(id,'user')){
            return Users.findOne({_id: id },{fields : {profile:1}});
      });



    }
}
