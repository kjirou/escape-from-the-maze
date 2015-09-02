'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var EVENTS = (0, _keymirror2['default'])({
  CHANGE_PAGE: null,
  EXIT: null,
  UPDATE_DIALOG: null,
  UPDATE_ERRORS: null,
  UPDATE_GAME_STATUS: null,
  UPDATE_MAZE: null
});

exports['default'] = EVENTS;
module.exports = exports['default'];