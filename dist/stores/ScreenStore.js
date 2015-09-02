'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _consts = require('consts');

var _dispatcherAppDispatcher = require('dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var _libEventManager = require('lib/EventManager');

var _libEventManager2 = _interopRequireDefault(_libEventManager);

var _storesGameStore = require('stores/GameStore');

var _storesGameStore2 = _interopRequireDefault(_storesGameStore);

var _storesStore = require('stores/Store');

var _storesStore2 = _interopRequireDefault(_storesStore);

var DIALOG_INPUT_MATCHER = /^[a-zA-Z0-9]{1,12}$/;
function validateDialogInput(input) {
  return DIALOG_INPUT_MATCHER.test(input);
}

var ScreenStore = (function (_Store) {
  _inherits(ScreenStore, _Store);

  function ScreenStore() {
    var _this = this;

    _classCallCheck(this, ScreenStore);

    _get(Object.getPrototypeOf(ScreenStore.prototype), 'constructor', this).call(this);

    this._pageId = 'welcome';
    this._runtimeErrors = [];

    Object.defineProperty(this, 'pageId', { get: function get() {
        return this._pageId;
      } });

    var dispatcher = _dispatcherAppDispatcher2['default'].getInstance();

    var _EventManager$getInstance = _libEventManager2['default'].getInstance();

    var emitter = _EventManager$getInstance.emitter;

    var gameStore = _storesGameStore2['default'].getInstance();
    this._dispatchToken = dispatcher.register(function (action) {
      dispatcher.waitFor([gameStore.getDispatchToken()]);

      switch (action.type) {
        case _consts.ACTIONS.CHANGE_PAGE:
          _this._pageId = action.pageId;
          emitter.emit(_consts.EVENTS.CHANGE_PAGE);
          break;
        case _consts.ACTIONS.EXIT:
          emitter.emit(_consts.EVENTS.EXIT);
          break;
        case _consts.ACTIONS.THROW_RUNTIME_ERROR:
          _this._runtimeErrors.push(action.err);
          emitter.emit(_consts.EVENTS.UPDATE_ERRORS);
          break;
      }
    });
  }

  _createClass(ScreenStore, [{
    key: 'getLastRuntimeError',
    value: function getLastRuntimeError() {
      return _lodash2['default'].last(this._runtimeErrors);
    }
  }]);

  return ScreenStore;
})(_storesStore2['default']);

exports['default'] = ScreenStore;
module.exports = exports['default'];