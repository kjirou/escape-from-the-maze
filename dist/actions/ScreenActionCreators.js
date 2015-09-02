'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constsActions = require('consts/actions');

var _constsActions2 = _interopRequireDefault(_constsActions);

var _dispatcherAppDispatcher = require('dispatcher/AppDispatcher');

var _dispatcherAppDispatcher2 = _interopRequireDefault(_dispatcherAppDispatcher);

var ScreenActionCreators = {

  changePage: function changePage(pageId) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].CHANGE_PAGE,
      pageId: pageId
    });
  },

  closeDialog: function closeDialog() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].CLOSE_DIALOG
    });
  },

  deleteLastInputFromDialog: function deleteLastInputFromDialog() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].DELETE_LAST_INPUT_FROM_DIALOG
    });
  },

  exit: function exit() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].EXIT
    });
  },

  inputKeyToDialog: function inputKeyToDialog(keyName) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].INPUT_KEY_TO_DIALOG,
      keyName: keyName
    });
  },

  openDialog: function openDialog() {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].OPEN_DIALOG
    });
  },

  prepareGame: function prepareGame(stageTypeId) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].PREPARE_GAME,
      stageTypeId: stageTypeId
    });
  },

  /*
   * @param err {Error}
   */
  throwRuntimeError: function throwRuntimeError(err) {
    _dispatcherAppDispatcher2['default'].getInstance().dispatch({
      type: _constsActions2['default'].THROW_RUNTIME_ERROR,
      err: err
    });
  }
};

exports['default'] = ScreenActionCreators;
module.exports = exports['default'];