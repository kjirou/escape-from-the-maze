import keymirror from 'keymirror';


const ACTIONS = keymirror({
  ADVANCE_TO_NEXT_MAZE: null,
  ASSUME_PICKS_MODE: null,
  CLOSE_DIALOG: null,
  CANCEL_PICKS_MODE: null,
  CHANGE_PAGE: null,
  CRUSH_WALL_BY_PLAYER: null,
  DELETE_LAST_INPUT_FROM_DIALOG: null,
  EXIT: null,
  FORWARD_GAME_TIME_BY_FRAME: null,
  INPUT_KEY_TO_DIALOG: null,
  OPEN_DIALOG: null,
  PREPARE_GAME: null,
  REQUEST_ADDING_GAME_RESULT: null,
  RESET_GAME: null,
  SAVE_DEFEAT: null,
  SAVE_VICTORY: null,
  SELECT_STAGE: null,
  THROW_RUNTIME_ERROR: null,
  WALK_PLAYER: null
});


export default ACTIONS;
