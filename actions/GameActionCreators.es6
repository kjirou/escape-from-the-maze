import ACTIONS from 'consts/actions';
import AppDispatcher from 'dispatcher/AppDispatcher';


const GameActionCreators = {

  advanceToNextMaze() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.ADVANCE_TO_NEXT_MAZE
    });
  },

  assumePicksMode() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.ASSUME_PICKS_MODE
    });
  },

  cancelPicksMode() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.CANCEL_PICKS_MODE
    });
  },

  crushWallByPlayer(direction) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.CRUSH_WALL_BY_PLAYER,
      direction
    });
  },

  forwardGameTimeByFrame() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.FORWARD_GAME_TIME_BY_FRAME
    });
  },

  resetGame() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.RESET_GAME
    });
  },

  saveDefeat() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.SAVE_DEFEAT
    });
  },

  saveVictory() {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.SAVE_VICTORY
    });
  },

  walkPlayer(direction) {
    AppDispatcher.getInstance().dispatch({
      type: ACTIONS.WALK_PLAYER,
      direction
    });
  }
};


export default GameActionCreators;
