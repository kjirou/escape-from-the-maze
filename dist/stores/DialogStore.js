'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

var _storesStore = require('stores/Store');

var _storesStore2 = _interopRequireDefault(_storesStore);

var DIALOG_INPUT_MATCHER = /^[a-zA-Z0-9]{1,12}$/;
function validateDialogInput(input) {
  return DIALOG_INPUT_MATCHER.test(input);
}

var DialogStore = (function (_Store) {
  _inherits(DialogStore, _Store);

  function DialogStore() {
    var _this = this;

    _classCallCheck(this, DialogStore);

    _get(Object.getPrototypeOf(DialogStore.prototype), 'constructor', this).call(this);

    this._isDialogActive = false;
    this._dialogInputValue = '';
    this._isValidDialogInput = false;

    Object.defineProperty(this, 'isDialogActive', { get: function get() {
        return this._isDialogActive;
      } });
    Object.defineProperty(this, 'dialogInputValue', { get: function get() {
        return this._dialogInputValue;
      } });
    Object.defineProperty(this, 'isValidDialogInput', { get: function get() {
        return this._isValidDialogInput;
      } });

    var dispatcher = _dispatcherAppDispatcher2['default'].getInstance();

    var _EventManager$getInstance = _libEventManager2['default'].getInstance();

    var emitter = _EventManager$getInstance.emitter;

    this._dispatchToken = dispatcher.register(function (action) {
      switch (action.type) {
        case _consts.ACTIONS.CLOSE_DIALOG:
          _this._isDialogActive = false;
          _this._dialogInputValue = '';
          emitter.emit(_consts.EVENTS.UPDATE_DIALOG);
          break;
        case _consts.ACTIONS.DELETE_LAST_INPUT_FROM_DIALOG:
          _this._dialogInputValue = _this._dialogInputValue.slice(0, -1);
          _this._isValidDialogInput = validateDialogInput(_this._dialogInputValue);
          emitter.emit(_consts.EVENTS.UPDATE_DIALOG);
          break;
        case _consts.ACTIONS.INPUT_KEY_TO_DIALOG:
          _this._dialogInputValue += action.keyName;
          _this._isValidDialogInput = validateDialogInput(_this._dialogInputValue);
          emitter.emit(_consts.EVENTS.UPDATE_DIALOG);
          break;
        case _consts.ACTIONS.OPEN_DIALOG:
          _this._isDialogActive = true;
          _this._dialogInputValue = '';
          _this._isValidDialogInput = false;
          emitter.emit(_consts.EVENTS.UPDATE_DIALOG);
          break;
      }
    });
  }

  return DialogStore;
})(_storesStore2['default']);

exports['default'] = DialogStore;
module.exports = exports['default'];