import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './userShow.html';

Template.userShow.helpers({
    user: function() {
        return this;
    },
    email: function() {
      return this.emails[0].address;
    },
    roles: function() {
      return Meteor.roles.find({});
    },
    userIsNotSA: function() {
      return !(this.roles[0] === 'admin.super');
    },
});

Template.role.helpers({
  role: function() {
    return this;
  },
  userIsInRole: function(user){
    return Roles.userIsInRole(user._id,this.name);
  },
  roleIsNotSA: function(){
    return !(this.name === 'admin.super');
  },
});

Template.userShow.events({
  "change .dropdownRoles": function(event, template){
    event.preventDefault();
    Meteor.call("users.changeRole", this._id, $(event.currentTarget).val(), function(error, result){
      if(error){
        console.log("error", error);
      }
      console.log('SUCESSO!');
    });

  },
  "click .remove": function(event, template) {
    event.preventDefault();
    let userId = this._id;
    swal({
      type: 'warning',
      title: 'Remover registro',
      text: 'Realmente deseja remover este registro?\n' +
            `${this.emails[0].address}`,
      showCancelButton: true,
      cancelButtonText: "Não",
      confirmButtonText: "Sim",
    }).then(function() {
      Meteor.call("users.remove", userId, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          swal({
            type: 'success',
            title: 'Registro removido',
            text: 'Registro removido com suscesso!',
          });
        }
      });
      }, function(dismiss) {
      if (dismiss == 'cancel') {
        swal(
          'Cancelado',
          'O registro não foi deletado.',
          'info'
        );
      }
    });
  }
});
