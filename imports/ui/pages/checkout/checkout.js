import './checkout.html';
//TODO Tratar parametro transaction_id

Template.checkout.onCreated(() => {
  Meteor.call("pagamentos.insert", Template.currentData().transaction_id, function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
      console.log(result);
    }
  });
});

Template.checkout.helpers({
  transactionId: function() {
    return this.transaction_id;
  },
  transactionIdLength: function() {
    return this.transaction_id.length * 1.14;
  }
});
