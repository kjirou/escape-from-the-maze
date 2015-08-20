import Dispatcher from 'dispatcher';


let GameActionCreators = {

  /**
   * Walk player to direction
   *
   * @param {string} pageId
   */
  walkPlayer(direction) {
    Dispatcher.getInstance().handleViewAction({
      type: 'walkPlayer',
      direction
    });
  }
};


export default GameActionCreators;
