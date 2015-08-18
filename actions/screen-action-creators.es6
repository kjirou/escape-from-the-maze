import Dispatcher from 'dispatcher';


let ScreenActionCreators = {

  /**
   * Change active page
   *
   * @param {string} pageId
   */
  changePage(pageId) {
    Dispatcher.getInstance().handleViewAction({
      type: 'changePage',
      pageId
    });
  }
};


export default ScreenActionCreators;
