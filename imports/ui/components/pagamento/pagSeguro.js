

Template.pagSeguro.helpers({

});

Template.pagSeguro.events({
  //Verificar eventos
  "submit .assinatura": function(event, template){
    event.preventDefault();

    Meteor.call("pagamento.insertSub", function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }
    });

    swal({
      title: "Redirecionando para o PagSeguro",
      text: "Aguarde por favor...",
      imageUrl: "../img/bx_loader.gif",
      imageClass: "img-resize-small",
      // closeOnConfirm: false,
      // showLoaderOnConfirm: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  },

  "submit .consorcio": function(event, template){
    event.preventDefault();

    var consorcio = {
      id: this._id,
      description: this.marca + " " + this.modelo,
      amount: this.valorParc,
    }

    Meteor.call("pagamento.insertCar", consorcio, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){

      }

      swal({
        title: "Redirecionando para o PagSeguro",
        text: "Aguarde por favor...",
        imageUrl: "../img/bx_loader.gif",
        imageClass: "img-resize-small",
        // closeOnConfirm: false,
        // showLoaderOnConfirm: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
    });
  },

  "submit .produto": function(event, template) {
    event.preventDefault();
    //TODO criar definições de produto.
  }
});
