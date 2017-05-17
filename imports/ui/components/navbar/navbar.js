import './navbar.html';


Template.navbar.helpers({
  isInHome: function(){
    if (Router.current().location.get().path === "/")
      return true;
    else {
      return false;
    }
  }
});

Template.navbar.events({
  "click .logout": function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  }
});
