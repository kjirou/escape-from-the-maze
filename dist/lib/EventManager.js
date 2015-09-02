'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _events = require('events');

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var EventManager = function EventManager() {
  _classCallCheck(this, EventManager);

  this._emitter = new _events.EventEmitter();

  Object.defineProperty(this, 'emitter', { get: function get() {
      return this._emitter;
    } });
};

exports['default'] = EventManager;

Object.assign(EventManager, _libMixinsSingletonMixin2['default']);
module.exports = exports['default'];