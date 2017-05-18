import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './userShow.html';

Template.userShow.helpers({
    user: function() {
        return this;
    },
});

Template.userShow.events({
  "submit .form-roles": function(event, template){
    event.preventDefault();
    
  }
});
