import './pontoAdmin.html';
import './user.js';
import {UserData} from '/imports/api/userData/userData.js';
import { Meteor } from 'meteor/meteor';


Template.body.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
  Meteor.subscribe("userData");
});

Template.pontoAdmin.helpers({
  users() {
      return UserData.find({});
  },

});
