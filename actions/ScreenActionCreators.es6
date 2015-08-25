import ACTIONS from 'consts/actions';
import AppDispatcher from 'dispatcher/AppDispatcher';


const ScreenActionCreators = {

  changePage(pageId) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.CHANGE_PAGE,
      pageId
    });
  },

  prepareGame(stageTypeId) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.PREPARE_GAME,
      stageTypeId
    });
  }
};


export default ScreenActionCreators;
