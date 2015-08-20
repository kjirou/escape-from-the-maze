import Dispatchers from 'dispatchers';


let GameActionCreators = {

  /**
   * Walk player to direction
   *
   * @param {string} pageId
   */
  walkPlayer(direction) {
    Dispatchers.getInstance().handleViewAction({
      type: 'walkPlayer',
      direction
    });
  }
};


export default GameActionCreators;
