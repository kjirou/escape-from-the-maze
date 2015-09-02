'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _actionsGameActionCreators = require('actions/GameActionCreators');

var _actionsGameActionCreators2 = _interopRequireDefault(_actionsGameActionCreators);

var _actionsScreenActionCreators = require('actions/ScreenActionCreators');

var _actionsScreenActionCreators2 = _interopRequireDefault(_actionsScreenActionCreators);

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _libStages = require('lib/stages');

var _modelsGameResultModel = require('models/GameResultModel');

var _modelsGameResultModel2 = _interopRequireDefault(_modelsGameResultModel);

var _modelsMazeModel = require('models/MazeModel');

var _modelsMazeModel2 = _interopRequireDefault(_modelsMazeModel);

var _modelsThingsBonusTime5ThingModel = require('models/things/BonusTime5ThingModel');

var _modelsThingsBonusTime5ThingModel2 = _interopRequireDefault(_modelsThingsBonusTime5ThingModel);

var _modelsThingsPenaltyTime3ThingModel = require('models/things/PenaltyTime3ThingModel');

var _modelsThingsPenaltyTime3ThingModel2 = _interopRequireDefault(_modelsThingsPenaltyTime3ThingModel);

var _storesGameStore = require('stores/GameStore');

var _storesGameStore2 = _interopRequireDefault(_storesGameStore);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  function _createGameStore() {
    var store = new _storesGameStore2['default']();
    _actionsScreenActionCreators2['default'].prepareGame('simple');
    return store;
  }

  beforeEach(function () {
    _app2['default'].purgeInstances();
  });

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _storesGameStore2['default'], 'function');
  });

  it('hasNextMaze', function () {
    var FooStage = Object.assign({}, _libStages.Stage);
    FooStage.mazeCount = 5;

    var store = _createGameStore();
    store._prepare();
    store._runningMazeCount = 4;
    _sinon2['default'].stub(store, '_getStage', function () {
      return FooStage;
    });

    _powerAssert2['default'].strictEqual(store.hasNextMaze(), true);
    store._runningMazeCount = 5;
    _powerAssert2['default'].strictEqual(store.hasNextMaze(), false);
  });

  it('_doesPlayerArriveGoal', function () {
    var store = _createGameStore();
    store._prepare();
    _powerAssert2['default'].strictEqual(store._doesPlayerArriveGoal(), false);
    store.maze.moveThing(store._things.player, [1, 1], store.maze.searchThingPos(store._things.upstairs));
    _powerAssert2['default'].strictEqual(store._doesPlayerArriveGoal(), true);
  });

  it('_crushWallByPlayer', function () {
    var store = _createGameStore();
    store._prepare();
    store._picksCount = 1;
    var playerPos = store._maze.searchThingPos(store._things.player);
    var upperPos = [playerPos[0] - 1, playerPos[1]];
    var wallAtUpper = store._maze.getCellOrError(upperPos).getThing();
    _powerAssert2['default'].strictEqual(wallAtUpper.getTypeId(), 'wall');
    store._crushWallByPlayer(_modelsMazeModel2['default'].DIRECTIONS.UP);
    var crushedThing = store._maze.getCellOrError(upperPos).getThing();
    _powerAssert2['default'].strictEqual(crushedThing, null);
    _powerAssert2['default'].strictEqual(store._picksCount, 0);
  });

  it('_pickThingsByPlayer', function () {
    var store = _createGameStore();
    store._prepare();
    var playerPos = store._maze.searchThingPos(store._things.player);
    function getThingCount() {
      return store._maze.getCellOrError(playerPos).getThings().length;
    }
    _powerAssert2['default'].strictEqual(getThingCount(), 1);
    var bonusTime5Thing = new _modelsThingsBonusTime5ThingModel2['default']();
    var penaltyTime3Thing = new _modelsThingsPenaltyTime3ThingModel2['default']();

    store._maze.addThing(bonusTime5Thing, playerPos);
    store._maze.addThing(penaltyTime3Thing, playerPos);

    _powerAssert2['default'].strictEqual(getThingCount(), 3);
    var baseTimeLimit = store._timeLimit;
    store._pickThingsByPlayer();
    _powerAssert2['default'].strictEqual(getThingCount(), 1);
    (0, _powerAssert2['default'])(store._timeLimit > baseTimeLimit);
  });

  it('_forwardGameTime', function () {
    var store = _createGameStore();
    _powerAssert2['default'].strictEqual(store._forwardGameTime(999), false);
    _powerAssert2['default'].strictEqual(store._forwardGameTime(1), true);
  });

  context('action subscription', function () {

    it('SAVE_VICTORY', function () {
      var store = _createGameStore();
      _powerAssert2['default'].strictEqual(store.gameResult, null);
      _actionsGameActionCreators2['default'].saveVictory();
      (0, _powerAssert2['default'])(store.gameResult instanceof _modelsGameResultModel2['default']);
    });
  });
});