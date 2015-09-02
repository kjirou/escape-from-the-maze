'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _actionsScreenActionCreators = require('actions/ScreenActionCreators');

var _actionsScreenActionCreators2 = _interopRequireDefault(_actionsScreenActionCreators);

var _componentsScreen = require('components/Screen');

var _componentsScreen2 = _interopRequireDefault(_componentsScreen);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

var _dispatcherAppDispatcher = require('dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var _inputAppInput = require('input/AppInput');

var _inputAppInput2 = _interopRequireDefault(_inputAppInput);

var _libEventManager = require('lib/EventManager');

var _libEventManager2 = _interopRequireDefault(_libEventManager);

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var _storesDialogStore = require('stores/DialogStore');

var _storesDialogStore2 = _interopRequireDefault(_storesDialogStore);

var _storesGameStore = require('stores/GameStore');

var _storesGameStore2 = _interopRequireDefault(_storesGameStore);

var _storesScreenStore = require('stores/ScreenStore');

var _storesScreenStore2 = _interopRequireDefault(_storesScreenStore);

var App = (function () {
  _createClass(App, null, [{
    key: 'initializeInstances',

    /*
     * Initialize unique instances in consideration of the order
     */
    value: function initializeInstances() {
      [function () {
        return _libEventManager2['default'].getInstance();
      }, function () {
        return _dispatcherAppDispatcher2['default'].getInstance();
      }, function () {
        return _storesDialogStore2['default'].getInstance();
      }, function () {
        return _storesGameStore2['default'].getInstance();
      }, function () {
        return _storesScreenStore2['default'].getInstance();
      }, function () {
        return _inputAppInput2['default'].getInstance();
      }].forEach(function (task) {
        return task();
      });
    }
  }, {
    key: 'purgeInstances',
    value: function purgeInstances() {
      [function () {
        return _componentsScreen2['default'].clearInstance();
      }, function () {
        return _inputAppInput2['default'].clearInstance();
      }, function () {
        return _storesScreenStore2['default'].clearInstance();
      }, function () {
        return _storesDialogStore2['default'].clearInstance();
      }, function () {
        return _storesGameStore2['default'].clearInstance();
      }, function () {
        return _dispatcherAppDispatcher2['default'].clearInstance();
      }, function () {
        return _libEventManager2['default'].clearInstance();
      }].forEach(function (task) {
        return task();
      });
    }
  }]);

  function App() {
    _classCallCheck(this, App);

    this.constructor.initializeInstances();
  }

  _createClass(App, [{
    key: 'start',
    value: function start() {
      _componentsScreen2['default'].getInstance({ componentMode: _conf2['default'].componentMode });
      _actionsScreenActionCreators2['default'].changePage('welcome');
    }
  }]);

  return App;
})();

exports['default'] = App;

Object.assign(App, _libMixinsSingletonMixin2['default']);
module.exports = exports['default'];