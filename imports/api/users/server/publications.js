import { Meteor } from 'meteor/meteor';
import { Users } from '../users.js';

//INSEGURO
Meteor.publish('users', function usersPublication() {
    return Users.find();
});
