import ACTIONS from 'consts/actions';
import Dispatchers from 'dispatchers';


const ScreenActionCreators = {

  changePage(pageId) {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.CHANGE_PAGE,
      pageId
    });
  },

  prepareGame(stageTypeId) {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.PREPARE_GAME,
      stageTypeId
    });
  }
};


export default ScreenActionCreators;
