import './cadcarro.html';

Template.cadcarro.helpers({
  editar: function() {
    return Router.current().route.getName() == "editarConsorcio";
  },
  urlValido: function() {
    if(this._id == undefined) {
      Router.go('cadastroConsorcio');
    }
  },
  formName: function(edit) {
    return edit ? "form-editcarro" : "form-cadcarro";
  },
  marca: function() {
    return this.marca;
  },
  modelo: function() {
    return this.modelo;
  },
  valorTotal: function() {
    return this.valorTotal;
  },
  valorParc: function() {
    return this.valorParc;
  },
  numParc: function() {
    return this.numParc;
  },
  categoria: function(categoria) {
    cat = (this.categoria == undefined) ? "integral" : this.categoria;
    return (cat == categoria) ? "checked" : "";
  },
  imageUrl: function() {
    return this.imagem;
  }
});

Template.cadcarro.events({
    "submit .form-cadcarro": function(event, template){
        event.preventDefault();

        var target = event.target;

        // TODO Transformar carro em produto
        var novoCarro = {
            marca: target.marca.value,
            modelo: target.modelo.value,
            categoria: target.categoria.value,
            valorTotal: parseFloat(target.valorTotal.value).toFixed(2),
            valorParc: parseFloat(target.valorParc.value).toFixed(2),
            numParc: target.numParc.value,
            imagem: target.imageUrl.value,
            // imagem: imagem._id,
            creator: {
                createdAt: new Date(),
                adminId: Meteor.userId(),
                //TODO FAZER CREATOR NO SERVIDOR
            }
        }

        Meteor.call("carros.insert", novoCarro, (error, result) => {
            if(error) {
                swal(error.reason, error.details, 'error');
            }
            else {
                swal("Foi!", "Carro cadastrado com sucesso.", "success");
            }
        });

        template.find(".form-cadcarro").reset();
    },
    "submit .form-editcarro": function(event, template) {
      event.preventDefault();
      console.log(this);

      let target = event.target;
      let carro = this;
      carro.marca = target.marca.value;
      carro.modelo = target.modelo.value;
      carro.categoria = target.categoria.value;
      carro.valorTotal = parseFloat(target.valorTotal.value).toFixed(2);
      carro.valorParc = parseFloat(target.valorParc.value).toFixed(2);
      carro.numParc = target.numParc.value;
      carro.imagem = target.imageUrl.value;

      console.log(this == carro);

      Meteor.call("carros.update", carro, function(error, result){
        if(error) {
          swal(error.reason, error.details, 'error');
        }
        else {
          swal("Foi!", "Carro editado com sucesso.", "success");
        }
      });
    }
});
