'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.onError = onError;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _actionsScreenActionCreators = require('actions/ScreenActionCreators');

var _actionsScreenActionCreators2 = _interopRequireDefault(_actionsScreenActionCreators);

function onError(err) {
  console.error(_chalk2['default'].red(err));
  _actionsScreenActionCreators2['default'].throwRuntimeError(err);
}