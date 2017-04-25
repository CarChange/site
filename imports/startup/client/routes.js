import { Router } from 'meteor/iron:router';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/register/register.js';

// Set up all routes in the app
Router.configure({
  layoutTemplate: 'App_body'
});

Router.route("/", {
  template:"home",
});

Router.route("/register");
