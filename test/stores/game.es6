import assert from 'power-assert';

import App from 'app';
import GameStore from 'stores/game';


describe('stores/game', function() {

  beforeEach(function() {
    App.purgeInstances();
  });

  it('should be defined', function() {
    assert.strictEqual(typeof GameStore, 'function');
  });

  it('_doesPlayerArriveGoal', function() {
    var store = new GameStore();
    store.prepareMaze();
    assert.strictEqual(store._doesPlayerArriveGoal(), false);
    store.maze.moveThing(
      store._things.player,
      [1, 1],
      store.maze.searchThingPos(store._things.upstairs)
    );
    assert.strictEqual(store._doesPlayerArriveGoal(), true);
  });
});
