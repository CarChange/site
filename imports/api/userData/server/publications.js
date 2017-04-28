import { Meteor } from 'meteor/meteor';
import { UserData } from '../userData.js';

Meteor.publish('userData', function userDataPublication() {
    return UserData.find();
});
