'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constsActions = require('consts/actions');

var _constsActions2 = _interopRequireDefault(_constsActions);

var _dispatcherAppDispatcher = require('dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var GameActionCreators = {

  advanceToNextMaze: function advanceToNextMaze() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].ADVANCE_TO_NEXT_MAZE
    });
  },

  assumePicksMode: function assumePicksMode() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].ASSUME_PICKS_MODE
    });
  },

  cancelPicksMode: function cancelPicksMode() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].CANCEL_PICKS_MODE
    });
  },

  crushWallByPlayer: function crushWallByPlayer(direction) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].CRUSH_WALL_BY_PLAYER,
      direction: direction
    });
  },

  forwardGameTimeByFrame: function forwardGameTimeByFrame() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].FORWARD_GAME_TIME_BY_FRAME
    });
  },

  /* async */
  requestAddingGameResult: function requestAddingGameResult(playerName) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].REQUEST_ADDING_GAME_RESULT,
      playerName: playerName
    });
  },

  resetGame: function resetGame() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].RESET_GAME
    });
  },

  saveDefeat: function saveDefeat() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].SAVE_DEFEAT
    });
  },

  saveVictory: function saveVictory() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].SAVE_VICTORY
    });
  },

  walkPlayer: function walkPlayer(direction) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].WALK_PLAYER,
      direction: direction
    });
  }
};

exports['default'] = GameActionCreators;
module.exports = exports['default'];