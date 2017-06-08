import { Images } from '/imports/api/images/images.js';

import './cadcarro.html';

Template.cadcarro.events({
    "submit .form-cadcarro": function(event, template){
        event.preventDefault();

        var target = event.target;

        // var imagem = Images.insert(target.pic.files[0], function (err, fileObj) {
        //   if(err)
        //     console.log("erro: ");
        //     console.log(err);
        // });

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
                swal("Foi!", "Carro cadastrado com sucesso.");
            }
        });

        template.find(".form-cadcarro").reset();
    }
});
