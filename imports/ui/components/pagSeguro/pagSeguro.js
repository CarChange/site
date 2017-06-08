

Template.pagSeguro.helpers({

});

Template.pagSeguro.events({
  //Verificar eventos
  "submit .assinatura": function(event, template){
    event.preventDefault();

    Meteor.call("pagamento.insertAss", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },
  "submit .consorcio": function(event, template){
    event.preventDefault();

    var consorcio = {
      id: this._id,
      description: this.marca + " " + this.modelo,
      amount: this.valorParc,
      quantity: 1,
      //weight: ?,
    }

    Meteor.call("pagamento.insertConsorcio", consorcio, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });
  },
  "submit .produto": function(event, template) {
    event.preventDefault();
    //TODO criar definições de produto.
  }
});
