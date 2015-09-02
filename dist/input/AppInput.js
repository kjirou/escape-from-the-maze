'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _keypress = require('keypress');

var _keypress2 = _interopRequireDefault(_keypress);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _inputSubscriptionsError = require('input/subscriptions/error');

var _inputSubscriptionsKeypress = require('input/subscriptions/keypress');

var _inputSubscriptionsTimer = require('input/subscriptions/timer');

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var _libUtil = require('lib/util');

(0, _keypress2['default'])(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

var AppInput = (function () {
  function AppInput() {
    _classCallCheck(this, AppInput);

    var pauser = new _rx2['default'].Subject();

    var timerSource = _rx2['default'].Observable.timer(0, (0, _libUtil.calculateMillisecondsPerFrame)()).timeInterval().map(function (data) {
      pauser.onNext(true);
      return data;
    });

    var wrappedHandler = undefined;
    var keypressSource = _rx2['default'].Observable.fromEventPattern(function (handler) {
      wrappedHandler = function (chr, key) {
        if (!key) {
          key = {
            name: chr,
            ctrl: false,
            sequence: chr
          };
        }
        handler(key);
      };
      process.stdin.addListener('keypress', wrappedHandler);
    }, function () {
      process.stdin.removeListener('keypress', wrappedHandler);
    }).pausable(pauser).filter(function () {
      var isStopped = pauser.isStopped;
      pauser.onNext(false);
      return !isStopped;
    });

    this._timerSubscription = timerSource.subscribe(_inputSubscriptionsTimer.onTimer, _inputSubscriptionsError.onError);
    this._keypressSubscription = keypressSource.subscribe(_inputSubscriptionsKeypress.onKeypress, _inputSubscriptionsError.onError);
  }

  _createClass(AppInput, [{
    key: '_destructor',
    value: function _destructor() {
      this._timerSubscription.dispose();
      this._keypressSubscription.dispose();
    }
  }]);

  return AppInput;
})();

exports['default'] = AppInput;

Object.assign(AppInput, _libMixinsSingletonMixin2['default']);

AppInput._destructInstance = function _destructInstance() {
  if (this._instance) {
    this._instance._destructor();
  }
};
module.exports = exports['default'];