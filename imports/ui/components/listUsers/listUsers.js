import './listUsers.html';
import '../userShow/userShow.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Users } from '/imports/api/users/users.js';

Template.listUsers.helpers({
  users() {
      if(Users.find().count() != 1)
        return Users.find();
  },
  searching() {
    return Template.instance().searching.get();
  },
  query() {
    return Template.instance().searchQuery.get();
  },
});

Template.listUsers.onCreated( () => {
  let template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );

  template.autorun( () => {
    template.subscribe( 'users', template.searchQuery.get(), () => {
      setTimeout( () => {
        template.searching.set( false );
      }, 300 );
    });
  });
});

Template.listUsers.events({
  'keyup [name="procuraUser"]' ( event, template ) {
    let value = event.target.value.trim();
    //13 é a tecla enter
    //"only execute the search if the input is not blank and the user is pressing the enter key"
    if ( value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }

    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  }
});
