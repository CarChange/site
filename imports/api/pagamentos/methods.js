import { Meteor } from 'meteor/meteor';
import { Pagamentos } from './pagamentos.js';
import { check } from 'meteor/check';
import pagseguro from 'pagseguro';

Meteor.methods({
    'pagamentos.insertSub': function() {

        // if(Roles.userIsInRole(Meteor.userId(), 'user'))
        // if(Meteor.userId())
        //     throw new Meteor.error("Não Autorizado", "Precisa ser um usuário para realizar pagamentos. Verifique se está logado.");

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
            id: 1, //id assinatura fixo
            description: 'Anualidade do Clube CarChange', //fixo
            amount: "180.00", //fixo
            quantity: 1, //fixo
        });

        //Configurando as informações do comprador
        pag.buyer({
            name: Meteor.user().profile.nome.primeiro+' '+Meteor.user().profile.nome.ultimo,
            email: Meteor.user().emails[0].address,
            phoneAreaCode: Meteor.user().profile.celular.DDD,
            phoneNumber: Meteor.user().profile.celular.numero,
        });
        console.log(Meteor.user().emails[0].address);

        //Configuranto URLs de retorno e de notificação (Opcional)
        //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
        pag.setRedirectURL("https://www.carchange.com.br");
        //pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao"); aprender notificações
        //Enviando o xml ao pagseguro

        pag.send(function(err, res) {
            if (err) {
                console.log('ERRO NO SEND DO PAGSEGURO');
                console.log(err);
                myFuture.throw(err);
            }
            console.log(res);
            var parser = new xml2js.Parser();
            parser.parseString(res, function(err, res) {
              myFuture.return(res.checkout.code[0]);
            })
        });
        console.log(myFuture.wait());

        var pagamento = {
          userId: Meteor.userId(),
          data: new Date(),
          token: myFuture.wait(),
        };
        Pagamentos.insert(pagamento);

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
