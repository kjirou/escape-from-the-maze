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
  },

  forwardGameTimeByFrame() {
    Dispatchers.getInstance().handleViewAction({
      type: 'forwardGameTimeByFrame'
    });
  },

  clearGame() {
    Dispatchers.getInstance().handleViewAction({
      type: 'clearGame'
    });
  }
};


export default GameActionCreators;
