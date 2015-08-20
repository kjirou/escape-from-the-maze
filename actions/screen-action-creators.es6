import Dispatchers from 'dispatchers';


let ScreenActionCreators = {

  changePage(pageId) {
    Dispatchers.getInstance().handleViewAction({
      type: 'changePage',
      pageId
    });
  },

  prepareGame() {
    Dispatchers.getInstance().handleViewAction({
      type: 'prepareGame'
    });
  }
};


export default ScreenActionCreators;
