'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.heading = heading;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

function heading(filePath) {
  var relativePath = _path2['default'].relative(_conf2['default'].root, filePath);
  relativePath = relativePath.replace(/^test\//, '');
  relativePath = relativePath.replace(/\.es6$/, '');
  return relativePath;
}