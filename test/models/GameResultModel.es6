import assert from 'power-assert';

import GameResultModel from 'models/GameResultModel';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('calculateScore', function() {
    let store = new GameResultModel({ timeLimit: 100000, lastGameTime: 77777 });
    assert.strictEqual(store.calculateScore(), 22223);
  });
});
