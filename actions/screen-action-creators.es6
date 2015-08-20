import Dispatcher from 'dispatcher';


let ScreenActionCreators = {

  changePage(pageId) {
    Dispatcher.getInstance().handleViewAction({
      type: 'changePage',
      pageId
    });
  },

  prepareGame() {
    Dispatcher.getInstance().handleViewAction({
      type: 'prepareGame'
    });
  }
};


export default ScreenActionCreators;
