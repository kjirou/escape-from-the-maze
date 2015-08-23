import ACTIONS from 'consts/actions';
import Dispatchers from 'dispatchers';


let GameActionCreators = {

  advanceToNextMaze() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.ADVANCE_TO_NEXT_MAZE
    });
  },

  forwardGameTimeByFrame() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.FORWARD_GAME_TIME_BY_FRAME
    });
  },

  resetGame() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.RESET_GAME
    });
  },

  saveDefeat() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.SAVE_DEFEAT
    });
  },

  saveVictory() {
    Dispatchers.getInstance().handleViewAction({
      type: ACTIONS.SAVE_VICTORY
    });
  },

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
  }
};


export default GameActionCreators;
