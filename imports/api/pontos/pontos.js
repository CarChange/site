//Exportado para methods.js, publications.js e pages//components que façam query nele.

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Pontos = new Mongo.Collection('pontos');
