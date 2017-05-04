import './cadcarro.html';

Template.cadcarro.events({
    "submit .form-cadcarro": function(event, template){
        event.preventDefault();

        var target = event.target;

        var novoCarro = {
            marca: target.marca.value,
            modelo: target.modelo.value,
            categoria: target.categoria.value,
            valor: target.valor.value,
            creator: {
                createdAt: new Date(),
                adminId: Meteor.userId(),
                //TODO FAZER CREATOR NO SERVIDOR
            }
        }

        Meteor.call("carros.insert", novoCarro, (error, result) => {
            if(error) {
                // swal(error.reason, error.details, 'error');
            }
            if (result) {
                swal("Foi!", "Carro cadastrado com sucesso.");
            }
        });

        template.find(".form-cadcarro").reset();
    }
});
