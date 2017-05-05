import { Meteor } from 'meteor/meteor';
import { Pagamentos } from './pagamentos.js';
import { check } from 'meteor/check';

Meteor.methods({
    'pagamentos.insert': function(pagamento) {

        if(Roles.userIsInRole(Meteor.userId(), 'user'))
            throw new Meteor.error("Não Autorizado", "Precisa ser um usuário para realizar pagamentos. Verifique se está logado.");

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

        Pagamentos.insert(pagamento);
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
