'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onTimer = onTimer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _actionsGameActionCreators = require('actions/GameActionCreators');

var _actionsGameActionCreators2 = _interopRequireDefault(_actionsGameActionCreators);

var _storesGameStore = require('stores/GameStore');

var _storesGameStore2 = _interopRequireDefault(_storesGameStore);

function onTimer(_ref) {
  var value = _ref.value;
  var interval = _ref.interval;

  var gameStore = _storesGameStore2['default'].getInstance();

  if (gameStore.isPlaying()) {
    _actionsGameActionCreators2['default'].forwardGameTimeByFrame();
  }

  if (gameStore.didPlayerGetVictoryJustNow()) {
    if (gameStore.hasNextMaze()) {
      _actionsGameActionCreators2['default'].advanceToNextMaze();
    } else {
      _actionsGameActionCreators2['default'].saveVictory();
    }
  } else if (gameStore.didPlayerGetDefeatJustNow()) {
    _actionsGameActionCreators2['default'].saveDefeat();
  }
}