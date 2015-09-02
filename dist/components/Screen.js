'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _blessed = require('blessed');

var _blessed2 = _interopRequireDefault(_blessed);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _devNull = require('dev-null');

var _devNull2 = _interopRequireDefault(_devNull);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBlessed = require('react-blessed');

var _RootComponent = require('./RootComponent');

var _RootComponent2 = _interopRequireDefault(_RootComponent);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

var _consts = require('consts');

var _libEventManager = require('lib/EventManager');

var _libEventManager2 = _interopRequireDefault(_libEventManager);

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var _storesScreenStore = require('stores/ScreenStore');

var _storesScreenStore2 = _interopRequireDefault(_storesScreenStore);

var Screen = (function () {
  function Screen() {
    _classCallCheck(this, Screen);

    var screen = _blessed2['default'].screen(this._createBlessedOptions());
    screen.debugLog.unkey(['q', 'escape']);
    (0, _reactBlessed.render)(_react2['default'].createElement(_RootComponent2['default'], null), screen);
    this._screen = screen;

    var _EventManager$getInstance = _libEventManager2['default'].getInstance();

    var emitter = _EventManager$getInstance.emitter;

    emitter.on(_consts.EVENTS.UPDATE_ERRORS, this._debug.bind(this));
    emitter.on(_consts.EVENTS.EXIT, this._exit.bind(this));
  }

  _createClass(Screen, [{
    key: '_createBlessedOptions',
    value: function _createBlessedOptions() {
      var options = {
        debug: true,
        title: 'Escape From The Maze'
      };

      if (_conf2['default'].ignoreScreenOutput) {
        options.output = (0, _devNull2['default'])();
      }

      return options;
    }
  }, {
    key: '_exit',
    value: function _exit() {
      process.stdin.pause();
      process.exit(0);
    }
  }, {
    key: '_debug',
    value: function _debug() {
      var screenStore = _storesScreenStore2['default'].getInstance();
      var err = screenStore.getLastRuntimeError();
      this._screen.debug(_chalk2['default'].red(err));
    }
  }]);

  return Screen;
})();

exports['default'] = Screen;

Object.assign(Screen, _libMixinsSingletonMixin2['default']);
module.exports = exports['default'];