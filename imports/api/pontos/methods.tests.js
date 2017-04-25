// Tests for the behavior of the pontos collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Pontos } from './pontos.js';

if (Meteor.isServer) {
  describe('pontos collection', function () {
    it('insert correctly', function () {
      const pontoId = Pontos.insert({
          username: "AdminTest",
          checked: true,
          dateIn: new Date(),
          eae: "deu certo huehue",
      });
      const added = Pontos.find({ _id: pontoId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'pontos');
      assert.equal(count, 1);
    });
  });
}
