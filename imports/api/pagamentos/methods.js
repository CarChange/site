import { Meteor } from 'meteor/meteor';
import { Pagamentos } from './pagamentos.js';
import { check } from 'meteor/check';
import pagseguro from 'pagseguro';

Meteor.methods({
    'pagamentos.insert': function(pagamento) {

        // if(Roles.userIsInRole(Meteor.userId(), 'user'))
        // if(Meteor.userId())
        //     throw new Meteor.error("Não Autorizado", "Precisa ser um usuário para realizar pagamentos. Verifique se está logado.");

        // check(pagamento, {
        //     refId: String,
        //     data: Date,
        //     userId: String,
        //     efetuado: Boolean,
        //     carrinho: {
        //         // produto: {
        //             produtoId: String,
        //             descricao: Object,
        //             valor: String,
        //             quantidade: Number,
        //         // }
        //     }
        // });

        var myFuture = new Future();
        var pagseguro = require('pagseguro'),
        pag = new pagseguro({
          email: 'consorcio.carchange@gmail.com',
          token: '3A631EB99D0E4D0CB059B9AB915079C8',
          mode: 'sandbox'
        });

        //Configurando a moeda e a referência do pedido
        pag.currency('BRL');
        pag.reference('12345');

        //Adicionando itens
        pag.addItem({
            id: 1,
            description: 'Descrição do primeiro produto',
            amount: "4230.00",
            quantity: 3,
            weight: 2342
        });

        pag.addItem({
            id: 2,
            description: 'Esta é uma descrição',
            amount: "5230.00",
            quantity: 3,
            weight: 2342
        });

        pag.addItem({
            id: 3,
            description: 'Descrição do último produto',
            amount: "8230.00",
            quantity: 3,
            weight: 2342
        });

        //Configurando as informações do comprador
        pag.buyer({
            name: 'José Comprador',
            email: 'comprador@uol.com.br',
            phoneAreaCode: '51',
            phoneNumber: '12345678'
        });

        //Configurando a entrega do pedido

        pag.shipping({
            type: 1,
            street: 'Rua Alameda dos Anjos',
            number: '367',
            complement: 'Apto 307',
            district: 'Parque da Lagoa',
            postalCode: '01452002',
            city: 'São Paulo',
            state: 'RS',
            country: 'BRA'
        });

        //Configuranto URLs de retorno e de notificação (Opcional)
        //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
        pag.setRedirectURL("https://www.carchange.com.br");
        //pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao"); aprender notificações
        //Enviando o xml ao pagseguro
        pag.send(function(err, res) {
            if (err) {
                console.log(err);
                myFuture.throw(err);
            }
            var parser = new xml2js.Parser();
            parser.parseString(res, function(err, res) {
              //console.log(res); se quiser ver a resposta no server
              myFuture.return(res.checkout.code[0]);
            })
        });
        return myFuture.wait();
    },
    'pagamentos.efetuar': function(pagamentoId) {

        check(pagamento, {
            refId: String,
            data: Date,
            userId: String,
            efetuado: Boolean,
            carrinho: {
                // produto: {
                    produtoId: String,
                    descricao: Object,
                    valor: String,
                    quantidade: Number,
                // }
            }
        });

        Pagamentos.update({_id:pagamentoId}, {$set:{ efetuado: true }});
    }
});
