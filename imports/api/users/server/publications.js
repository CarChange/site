import { Meteor } from 'meteor/meteor';
import { Users } from '../users.js';

//Isso é um gato - MEOW
if(Meteor.isServer){
  console.log("ENTRA POW");
      Meteor.publish('users', function usersPublication() {
          if(Roles.userIsInRole(this.userId,'admin')){
            return Users.find({});
          }else {
            throw new Meteor.Error("bad", "stuff");
          }
      });

      Meteor.publish('user', function userPublication() {
          if(Roles.userIsInRole(this.userId,'user')){
            return Users.findOne({_id: id },{fields : {profile:1}});
          }
      });

}
