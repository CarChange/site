import './navbar.html';


Template.navbar.helpers({
  isInHome: function(){
      return Router.current().location.get().path === "/";
  }
});

Template.navbar.events({
  "click .logout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  }
});
