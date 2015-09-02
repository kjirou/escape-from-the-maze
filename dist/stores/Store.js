'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var Store = (function () {
  function Store() {
    _classCallCheck(this, Store);

    this._dispatchToken = null;
  }

  _createClass(Store, [{
    key: 'getDispatchToken',
    value: function getDispatchToken() {
      if (!this._dispatchToken) {
        throw new Error('dispatchToken does not exist');
      }
      return this._dispatchToken;
    }
  }]);

  return Store;
})();

exports['default'] = Store;

Object.assign(Store, _libMixinsSingletonMixin2['default']);
module.exports = exports['default'];