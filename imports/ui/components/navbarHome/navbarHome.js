import './navbarHome.html';


Template.navbarHome.helpers({
  create: function(){

  },
  rendered: function(){

  },
  destroyed: function(){

  },
});

Template.navbarHome.events({
  "click .logout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  }
});
