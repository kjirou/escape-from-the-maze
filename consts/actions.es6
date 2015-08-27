import keymirror from 'keymirror';


const ACTIONS = keymirror({
  ADVANCE_TO_NEXT_MAZE: null,
  ASSUME_PICKS_MODE: null,
  CANCEL_PICKS_MODE: null,
  CHANGE_PAGE: null,
  CRUSH_WALL_BY_PLAYER: null,
  EXIT: null,
  FORWARD_GAME_TIME_BY_FRAME: null,
  PREPARE_GAME: null,
  RESET_GAME: null,
  SAVE_DEFEAT: null,
  SAVE_VICTORY: null,
  SELECT_STAGE: null,
  THROW_RUNTIME_ERROR: null,
  WALK_PLAYER: null
});


export default ACTIONS;
