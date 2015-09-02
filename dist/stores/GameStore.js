'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _consts = require('consts');

var _dispatcherAppDispatcher = require('dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var _libEventManager = require('lib/EventManager');

var _libEventManager2 = _interopRequireDefault(_libEventManager);

var _libStages = require('lib/stages');

var _libApis = require('lib/apis');

var _libUtil = require('lib/util');

var _modelsGameResultModel = require('models/GameResultModel');

var _modelsGameResultModel2 = _interopRequireDefault(_modelsGameResultModel);

var _modelsMazeModel = require('models/MazeModel');

var _modelsMazeModel2 = _interopRequireDefault(_modelsMazeModel);

var _modelsThingsBonusTime5ThingModel = require('models/things/BonusTime5ThingModel');

var _modelsThingsBonusTime5ThingModel2 = _interopRequireDefault(_modelsThingsBonusTime5ThingModel);

var _modelsThingsPenaltyTime3ThingModel = require('models/things/PenaltyTime3ThingModel');

var _modelsThingsPenaltyTime3ThingModel2 = _interopRequireDefault(_modelsThingsPenaltyTime3ThingModel);

var _modelsThingsPicksThingModel = require('models/things/PicksThingModel');

var _modelsThingsPicksThingModel2 = _interopRequireDefault(_modelsThingsPicksThingModel);

var _modelsThingsPlayerThingModel = require('models/things/PlayerThingModel');

var _modelsThingsPlayerThingModel2 = _interopRequireDefault(_modelsThingsPlayerThingModel);

var _modelsThingsUpstairsThingModel = require('models/things/UpstairsThingModel');

var _modelsThingsUpstairsThingModel2 = _interopRequireDefault(_modelsThingsUpstairsThingModel);

var _storesStore = require('stores/Store');

var _storesStore2 = _interopRequireDefault(_storesStore);

function createDefaultThings() {
  return {
    player: null,
    upstairs: null
  };
}

var GameStore = (function (_Store) {
  _inherits(GameStore, _Store);

  function GameStore() {
    var _this = this;

    _classCallCheck(this, GameStore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(GameStore.prototype), 'constructor', this).apply(this, args);

    Object.assign(this, {
      _stageTypeId: undefined,
      _gameTime: undefined,
      _timeLimit: undefined,
      _runningMazeCount: undefined,
      _picksCount: undefined,
      _isAssumedPicksMode: undefined,
      _maze: undefined,
      _hasBeenVictory: undefined,
      _hasBeenDefeat: undefined,
      _things: undefined,
      _gameResult: undefined
    });
    this._reset();

    Object.defineProperty(this, 'maze', { get: function get() {
        return this._maze;
      } });
    Object.defineProperty(this, 'timeLimit', { get: function get() {
        return this._timeLimit;
      } });
    Object.defineProperty(this, 'gameTime', { get: function get() {
        return this._gameTime;
      } });
    Object.defineProperty(this, 'runningMazeCount', { get: function get() {
        return this._runningMazeCount;
      } });
    Object.defineProperty(this, 'picksCount', { get: function get() {
        return this._picksCount;
      } });
    Object.defineProperty(this, 'isAssumedPicksMode', { get: function get() {
        return this._isAssumedPicksMode;
      } });
    Object.defineProperty(this, 'hasBeenVictory', { get: function get() {
        return this._hasBeenVictory;
      } });
    Object.defineProperty(this, 'hasBeenDefeat', { get: function get() {
        return this._hasBeenDefeat;
      } });
    Object.defineProperty(this, 'gameResult', { get: function get() {
        return this._gameResult;
      } });

    var dispatcher = _dispatcherAppDispatcher2['default'].getInstance();

    var _EventManager$getInstance = _libEventManager2['default'].getInstance();

    var emitter = _EventManager$getInstance.emitter;

    var dispatchToken0 = dispatcher.register(function (action) {
      switch (action.type) {
        case _consts.ACTIONS.ADVANCE_TO_NEXT_MAZE:
          _this._resetMaze();
          _this._prepareMaze();
          _this._runningMazeCount += 1;
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          break;
        case _consts.ACTIONS.PREPARE_GAME:
          _this._stageTypeId = action.stageTypeId;
          _this._prepare();
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          break;
      }
    });
    this._dispatchToken = dispatcher.register(function (action) {
      dispatcher.waitFor([dispatchToken0]);
      switch (action.type) {
        case _consts.ACTIONS.ASSUME_PICKS_MODE:
          _this._isAssumedPicksMode = true;
          emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          break;
        case _consts.ACTIONS.CANCEL_PICKS_MODE:
          _this._isAssumedPicksMode = false;
          emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          break;
        case _consts.ACTIONS.CRUSH_WALL_BY_PLAYER:
          _this._isAssumedPicksMode = false;
          _this._crushWallByPlayer(action.direction);
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          break;
        case _consts.ACTIONS.FORWARD_GAME_TIME_BY_FRAME:
          if (_this._forwardGameTime((0, _libUtil.calculateMillisecondsPerFrame)())) {
            emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          }
          break;
        case _consts.ACTIONS.RESET_GAME:
          _this._reset();
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          break;
        case _consts.ACTIONS.REQUEST_ADDING_GAME_RESULT:
          // FIXME: Could not receive callback now
          (0, _libApis.requestAddingGameResult)({
            stageTypeId: _this._getStage().typeId,
            playerName: action.playerName,
            score: _this.gameResult.calculateScore()
          });
          break;
        case _consts.ACTIONS.SAVE_DEFEAT:
          _this._hasBeenDefeat = true;
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          break;
        case _consts.ACTIONS.SAVE_VICTORY:
          _this._hasBeenVictory = true;
          _this._gameResult = new _modelsGameResultModel2['default']({
            timeLimit: _this._timeLimit,
            lastGameTime: _this._gameTime
          });
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          break;
        case _consts.ACTIONS.WALK_PLAYER:
          _this._maze.walkThing(_this._things.player, action.direction);
          _this._pickThingsByPlayer();
          emitter.emit(_consts.EVENTS.UPDATE_MAZE);
          emitter.emit(_consts.EVENTS.UPDATE_GAME_STATUS);
          break;
      }
    });
  }

  _createClass(GameStore, [{
    key: '_getStage',
    value: function _getStage() {
      return _libStages.stages[this._stageTypeId] || null;
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this._stageTypeId = null;
      this._timeLimit = 1;
      this._gameTime = 0; // int, ms
      this._runningMazeCount = 1;
      this._picksCount = 0;
      this._isAssumedPicksMode = false;
      this._hasBeenVictory = false;
      this._hasBeenDefeat = false;
      this._isDuringInputForScoring = false;
      this._gameResult = null;
      this._resetMaze();
    }
  }, {
    key: '_resetMaze',
    value: function _resetMaze() {
      this._maze = null;
      this._things = createDefaultThings();
    }
  }, {
    key: '_prepare',
    value: function _prepare() {
      var stage = this._getStage();
      this._timeLimit = stage.timeLimit;
      this._picksCount = stage.picksCount;
      this._prepareMaze();
    }
  }, {
    key: '_prepareMaze',
    value: function _prepareMaze() {
      var stage = this._getStage();
      var maze = _modelsMazeModel2['default'].createByExtent([20, 10]);
      var player = new _modelsThingsPlayerThingModel2['default']();
      var upstairs = new _modelsThingsUpstairsThingModel2['default']();
      maze.addThing(player, [1, 1]);
      maze.addThing(upstairs, [maze.getHeight() - 2, maze.getWidth() - 2]);

      _lodash2['default'].range(stage.bonusTimeThingCount).forEach(function () {
        var pos = _lodash2['default'].sample(maze.getBlankPosList());
        maze.addThing(new _modelsThingsBonusTime5ThingModel2['default'](), pos);
      });
      _lodash2['default'].range(stage.penaltyTimeThingCount).forEach(function () {
        var pos = _lodash2['default'].sample(maze.getBlankPosList());
        maze.addThing(new _modelsThingsPenaltyTime3ThingModel2['default'](), pos);
      });
      _lodash2['default'].range(stage.picksThingCount).forEach(function () {
        var pos = _lodash2['default'].sample(maze.getBlankPosList());
        maze.addThing(new _modelsThingsPicksThingModel2['default'](), pos);
      });

      this._maze = maze;
      this._things = {
        player: player,
        upstairs: upstairs
      };
    }

    /*
     * @return {boolean}  A second advanced or is not so
     */
  }, {
    key: '_forwardGameTime',
    value: function _forwardGameTime(ms) {
      var beforeGameTime = this._gameTime;
      this._gameTime += ms;
      return ~ ~(beforeGameTime / 1000) !== ~ ~(this._gameTime / 1000);
    }

    /*
     * @param {string} direction  Maze.DIRECTIONS
     */
  }, {
    key: '_crushWallByPlayer',
    value: function _crushWallByPlayer(direction) {
      if (this._picksCount < 1) {
        return;
      }
      var playerPos = this._maze.searchThingPos(this._things.player);
      var targetPos = _modelsMazeModel2['default'].composeCoordinates(playerPos, _modelsMazeModel2['default'].getRelativePosByDirection(direction));
      var targetThing = this._maze.getCellOrError(targetPos).getThing();
      if (!targetThing || targetThing.getTypeId() !== 'wall') {
        return;
      }
      this._maze.removeThing(targetThing, targetPos);
      this._picksCount -= 1;
    }
  }, {
    key: '_pickThingsByPlayer',
    value: function _pickThingsByPlayer() {
      var _this2 = this;

      var playerPos = this._maze.searchThingPos(this._things.player);
      if (!playerPos) {
        return;
      }
      var things = this._maze.getCellOrError(playerPos).getThings();
      var pickableThings = things.filter(function (thing) {
        return thing !== _this2._things.player && thing.isPickable();
      });
      pickableThings.forEach(function (thing) {
        switch (thing.getTypeId()) {
          case 'bonus_time_5':
            _this2._timeLimit += 5000;
            break;
          case 'penalty_time_3':
            _this2._timeLimit -= 3000;
            break;
          case 'picks':
            _this2._picksCount += 1;
            break;
        }
        _this2._maze.removeThing(thing, playerPos);
      });
    }
  }, {
    key: 'getMazeCount',
    value: function getMazeCount() {
      var stage = this._getStage();
      if (!stage) {
        return 0;
      }
      return stage.mazeCount;
    }
  }, {
    key: 'hasNextMaze',
    value: function hasNextMaze() {
      return this._runningMazeCount < this.getMazeCount();
    }

    //
    // Game Lifecycle
    //
    //                1 2 3 4 5
    // -------------------------
    // isStarted      F T T T F
    // didPlayerGet~  F F T F F
    // hasBeen~       F F F T F
    // -------------------------
    //
    // (1) = Did not prepare/start game
    // (2) = Playing the game
    // (3) = Player got a victory/defeat, but flow does not pass in fps-event
    // (4) = Saved a result to _hasBeenVictory/_hasBeenDefeat
    // (5) = Destroyed the game instance
    //
    // Notice:
    // - (3) can handle more than once in the fps-event,
    //     however, it can not be expected at all otherwise!
    //   In other words, it can not be used in the view.
    //

  }, {
    key: 'isStarted',
    value: function isStarted() {
      return !!this._maze;
    }
  }, {
    key: '_doesPlayerArriveGoal',
    value: function _doesPlayerArriveGoal() {
      return this.isStarted() && this._maze.areThingsStayingTogether([this._things.player, this._things.upstairs]);
    }
  }, {
    key: 'didPlayerGetVictoryJustNow',
    value: function didPlayerGetVictoryJustNow() {
      return !this._hasBeenVictory && this._doesPlayerArriveGoal();
    }
  }, {
    key: '_isTimeLimitExceeded',
    value: function _isTimeLimitExceeded() {
      return this.isStarted() && this._gameTime > this._timeLimit;
    }
  }, {
    key: 'didPlayerGetDefeatJustNow',
    value: function didPlayerGetDefeatJustNow() {
      return !this._hasBeenDefeat && this._isTimeLimitExceeded();
    }
  }, {
    key: 'isDecided',
    value: function isDecided() {
      return this._hasBeenVictory || this._hasBeenDefeat;
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this.isStarted() && !this.isDecided();
    }
  }]);

  return GameStore;
})(_storesStore2['default']);

exports['default'] = GameStore;
module.exports = exports['default'];