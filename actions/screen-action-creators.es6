import ACTIONS from 'consts/actions';
import Dispatchers from 'dispatchers';


let ScreenActionCreators = {

  changePage(pageId) {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.CHANGE_PAGE,
      pageId
    });
  },

  prepareGame() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.PREPARE_GAME
    });
  }
};


export default ScreenActionCreators;
