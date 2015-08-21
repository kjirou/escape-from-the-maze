import ACTIONS from 'consts/actions';
import Dispatchers from 'dispatchers';


let GameActionCreators = {

  /**
   * Walk player to direction
   *
   * @param {string} pageId
   */
  walkPlayer(direction) {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.WALK_PLAYER,
      direction
    });
  },

  forwardGameTimeByFrame() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.FORWARD_GAME_TIME_BY_FRAME
    });
  },

  clearGame() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.CLEAR_GAME
    });
  }
};


export default GameActionCreators;
