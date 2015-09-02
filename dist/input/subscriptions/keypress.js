'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onKeypress = onKeypress;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionsGameActionCreators = require('actions/GameActionCreators');

var _actionsGameActionCreators2 = _interopRequireDefault(_actionsGameActionCreators);

var _actionsScreenActionCreators = require('actions/ScreenActionCreators');

var _actionsScreenActionCreators2 = _interopRequireDefault(_actionsScreenActionCreators);

var _consts = require('consts');

var _modelsMazeModel = require('models/MazeModel');

var _modelsMazeModel2 = _interopRequireDefault(_modelsMazeModel);

var _storesDialogStore = require('stores/DialogStore');

var _storesDialogStore2 = _interopRequireDefault(_storesDialogStore);

var _storesGameStore = require('stores/GameStore');

var _storesGameStore2 = _interopRequireDefault(_storesGameStore);

var _storesScreenStore = require('stores/ScreenStore');

var _storesScreenStore2 = _interopRequireDefault(_storesScreenStore);

function getDirectionByKeyName(keyName) {
  // [w][a][s][d] or
  // [h][j][k][l] or
  // arrow keys
  return ({
    up: _modelsMazeModel2['default'].DIRECTIONS.UP,
    w: _modelsMazeModel2['default'].DIRECTIONS.UP,
    k: _modelsMazeModel2['default'].DIRECTIONS.UP,
    right: _modelsMazeModel2['default'].DIRECTIONS.RIGHT,
    d: _modelsMazeModel2['default'].DIRECTIONS.RIGHT,
    l: _modelsMazeModel2['default'].DIRECTIONS.RIGHT,
    down: _modelsMazeModel2['default'].DIRECTIONS.DOWN,
    s: _modelsMazeModel2['default'].DIRECTIONS.DOWN,
    j: _modelsMazeModel2['default'].DIRECTIONS.DOWN,
    left: _modelsMazeModel2['default'].DIRECTIONS.LEFT,
    a: _modelsMazeModel2['default'].DIRECTIONS.LEFT,
    h: _modelsMazeModel2['default'].DIRECTIONS.LEFT
  })[keyName] || null;
}

function acceptKeyOnWelcomePage(keyName, isControl) {
  var stageTypeId = _consts.KEYS.STAGE_SELECTION[keyName];

  if (stageTypeId) {
    _actionsScreenActionCreators2['default'].prepareGame(stageTypeId);
    _actionsScreenActionCreators2['default'].changePage('game');
    return true;
  }

  return false;
}

function acceptKeyOnGamePage(keyName, isControl) {
  var gameStore = _storesGameStore2['default'].getInstance();

  if (gameStore.isPlaying()) {
    var direction = getDirectionByKeyName(keyName);
    if (direction) {
      if (gameStore.isAssumedPicksMode) {
        _actionsGameActionCreators2['default'].crushWallByPlayer(direction);
        return true;
      } else {
        _actionsGameActionCreators2['default'].walkPlayer(direction);
        return true;
      }
    } else if (keyName === 'space') {
      if (gameStore.isAssumedPicksMode) {
        _actionsGameActionCreators2['default'].cancelPicksMode();
        return true;
      } else {
        _actionsGameActionCreators2['default'].assumePicksMode();
        return true;
      }
    }
  }

  var backToWelcomePage = function backToWelcomePage() {
    _actionsGameActionCreators2['default'].resetGame();
    _actionsScreenActionCreators2['default'].changePage('welcome');
  };

  if (gameStore.hasBeenVictory) {
    if (keyName === 'y' || keyName === 'enter') {
      _actionsScreenActionCreators2['default'].openDialog();
      return true;
    } else if (keyName === 'n') {
      backToWelcomePage();
      return true;
    }
  } else if (gameStore.hasBeenDefeat) {
    if (keyName === 'enter') {
      backToWelcomePage();
      return true;
    }
  }

  return false;
}

function onKeypress(_ref) {
  var name = _ref.name;
  var ctrl = _ref.ctrl;
  var sequence = _ref.sequence;

  var screenStore = _storesScreenStore2['default'].getInstance();
  var dialogStore = _storesDialogStore2['default'].getInstance();
  var gameStore = _storesGameStore2['default'].getInstance();

  if (dialogStore.isDialogActive) {
    // FIXME: Generalize dialog's action
    if (name === 'enter') {
      if (!dialogStore.isValidDialogInput) {
        return;
      }
      if (screenStore.pageId === 'game' && dialogStore.isValidDialogInput && gameStore.hasBeenVictory) {
        _actionsGameActionCreators2['default'].requestAddingGameResult(dialogStore.dialogInputValue); // async
        _actionsScreenActionCreators2['default'].closeDialog();
        _actionsGameActionCreators2['default'].resetGame();
        _actionsScreenActionCreators2['default'].changePage('welcome');
        return;
      }
      _actionsScreenActionCreators2['default'].closeDialog();
      return;
    } else if (name === 'escape') {
      _actionsScreenActionCreators2['default'].closeDialog();
      return;
    } else if (name === 'backspace' || name === 'delete') {
      _actionsScreenActionCreators2['default'].deleteLastInputFromDialog();
      return;
    } else if (!ctrl) {
      _actionsScreenActionCreators2['default'].inputKeyToDialog(sequence);
      return;
    }
  }

  if (name === 'escape' || ctrl && name === 'c') {
    _actionsScreenActionCreators2['default'].exit();
    return;
  }

  var acceptKeyByActivePage = ({
    game: acceptKeyOnGamePage,
    welcome: acceptKeyOnWelcomePage
  })[screenStore.pageId];

  if (!acceptKeyByActivePage) {
    _actionsScreenActionCreators2['default'].throwRuntimeError(new Error(screenStore.pageId + ' is invalid pageId'));
    return;
  }

  if (acceptKeyByActivePage(name, ctrl)) {
    return;
  }
}