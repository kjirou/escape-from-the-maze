import ACTIONS from 'consts/actions';
import AppDispatcher from 'dispatcher/AppDispatcher';


const ScreenActionCreators = {

  cancelDialog() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.CANCEL_DIALOG
    });
  },

  changePage(pageId) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.CHANGE_PAGE,
      pageId
    });
  },

  deleteLastInputFromDialog() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.DELETE_LAST_INPUT_FROM_DIALOG
    });
  },

  exit() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.EXIT
    });
  },

  inputKeyToDialog(keyName) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.INPUT_KEY_TO_DIALOG,
      keyName
    });
  },

  openDialog() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.OPEN_DIALOG
    });
  },

  prepareGame(stageTypeId) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.PREPARE_GAME,
      stageTypeId
    });
  },

  submitDialog() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.SUBMIT_DIALOG
    });
  },

  /*
   * @param err {Error}
   */
  throwRuntimeError(err) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.THROW_RUNTIME_ERROR,
      err
    });
  }
};


export default ScreenActionCreators;
