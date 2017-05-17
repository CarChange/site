import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './user.html';

Template.user.helpers({
    user: function() {
        return this;
    },
});

Template.user.events({

});
