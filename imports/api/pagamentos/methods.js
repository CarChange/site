import { Meteor } from 'meteor/meteor';
import { Pagamentos } from './pagamentos.js';
import { check } from 'meteor/check';
import pagseguro from 'pagseguro';

Meteor.methods({
    'pagamentos.buySub': function() {

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
        pag.reference(Meteor.userId());

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

        //Configuranto URLs de retorno e de notificação (Opcional)
        //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
        pag.setRedirectURL("https://www.carchange.com.br");
        //pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao"); aprender notificações


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

        // var pagamento = {
        //   userId: Meteor.userId(),
        //   data: new Date(),
        // };
        //
        // Pagamentos.insert(pagamento);

        return myFuture.wait(); //espera o retorno do xml completo
    },


    'pagamentos.buyCar': function(carro) {
        check(carro, {
          id: String,
          description: String,
          amount: String,
        });

        var myFuture = new Future();
        var pagseguro = require('pagseguro'),
        pag = new pagseguro({
          email: 'consorcio.carchange@gmail.com',
          token: '3A631EB99D0E4D0CB059B9AB915079C8',
          mode: 'sandbox'
        });

        //Configurando a moeda e a referência do pedido
        pag.currency('BRL');
        pag.reference(Meteor.userId());

        //Adicionando itens
        pag.addItem({
            id: carro.id, //id do consorcio
            description: carro.description, //marca e modelo do carro
            amount: carro.amount, //valor da primeira parcela
            quantity: 1, //fixo
        });

        //Configurando as informações do comprador
        pag.buyer({
            name: Meteor.user().profile.nome.primeiro+' '+Meteor.user().profile.nome.ultimo,
            email: Meteor.user().emails[0].address,
            phoneAreaCode: Meteor.user().profile.celular.DDD,
            phoneNumber: Meteor.user().profile.celular.numero,
        });

        //Configuranto URLs de retorno e de notificação (Opcional)
        //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
        pag.setRedirectURL("https://www.carchange.com.br");
        //pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao"); aprender notificações


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

        // var pagamento = {
        //   userId: Meteor.userId(),
        //   data: new Date(),
        // };
        //
        // Pagamentos.insert(pagamento);

        return myFuture.wait(); //espera o retorno do xml completo
    },

    'pagamentos.insert': function(transactionId) {

      check(transactionId, String);

      var transactionOk = Pagamentos.findOne({'transaction':transactionId});
      if(transactionOk != null)
        throw new Meteor.Error("Transação já registrada!", "Um pagamento com a transaction_id '"+transactionId+"' já foi registrado.", transactionOk);

      var transaction = {
        user: this.userId,
        transaction: transactionId,
        date: new Date(),
      }

      Pagamentos.insert(transaction);
    }
});
