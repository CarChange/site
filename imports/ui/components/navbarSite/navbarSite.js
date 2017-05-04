import './navbarSite.html';


Template.navbarSite.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.navbarSite.events({
  "click .logout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  }
});
