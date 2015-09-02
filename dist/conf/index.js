'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var conf = {
  apiUrl: 'https://94uubrff77.execute-api.us-east-1.amazonaws.com/prod',
  fps: 60,
  ignoreScreenOutput: false,
  root: _path2['default'].join(__dirname, '/..')
};

exports['default'] = conf;
module.exports = exports['default'];