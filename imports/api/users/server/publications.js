import { Meteor } from 'meteor/meteor';
import { Users } from '../users.js';

//Isso é um gato - MEOW
if(Meteor.isServer){
  if(this.user){
    var id = this.userId();
    Meteor.publish('users', function usersPublication() {
        return Users.findOne({_id: id },{fields : {profile:1}});
    });
  }
}
