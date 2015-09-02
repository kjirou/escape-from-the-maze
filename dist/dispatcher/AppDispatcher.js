'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _flux = require('flux');

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var AppDispatcher = (function (_Dispatcher) {
  _inherits(AppDispatcher, _Dispatcher);

  function AppDispatcher() {
    _classCallCheck(this, AppDispatcher);

    _get(Object.getPrototypeOf(AppDispatcher.prototype), 'constructor', this).apply(this, arguments);
  }

  return AppDispatcher;
})(_flux.Dispatcher);

exports['default'] = AppDispatcher;

Object.assign(AppDispatcher, _libMixinsSingletonMixin2['default']);
module.exports = exports['default'];