import assert from 'power-assert';
import sinon from 'sinon';

import App from 'app';
import {Stage} from 'lib/stages';
import GameStore from 'stores/game';


describe('stores/game', function() {

  function _createGameStore() {
    var store = new GameStore();
    store._stageTypeId = 'simple';
    return store;
  }

  beforeEach(function() {
    App.purgeInstances();
  });

  it('should be defined', function() {
    assert.strictEqual(typeof GameStore, 'function');
  });

  it('hasNextMaze', function() {
    class FooStage extends Stage {}
    FooStage.mazeCount = 5;

    var store = _createGameStore();
    store._prepare();
    store._runningMazeCount = 4;
    sinon.stub(store, '_getStage', () => FooStage);

    assert.strictEqual(store.hasNextMaze(), true);
    store._runningMazeCount = 5;
    assert.strictEqual(store.hasNextMaze(), false);
  });

  it('_doesPlayerArriveGoal', function() {
    var store = _createGameStore();
    store._prepare();
    assert.strictEqual(store._doesPlayerArriveGoal(), false);
    store.maze.moveThing(
      store._things.player,
      [1, 1],
      store.maze.searchThingPos(store._things.upstairs)
    );
    assert.strictEqual(store._doesPlayerArriveGoal(), true);
  });
});
