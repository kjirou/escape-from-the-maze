import GameActionCreators from 'actions/GameActionCreators';
import ScreenActionCreators from 'actions/ScreenActionCreators';
import {KEYS} from 'consts';
import MazeModel from 'models/MazeModel';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


function getDirectionByKeyName(keyName) {
  // [w][a][s][d] or
  // [h][j][k][l] or
  // arrow keys
  return {
    up: MazeModel.DIRECTIONS.UP,
    w: MazeModel.DIRECTIONS.UP,
    k: MazeModel.DIRECTIONS.UP,
    right: MazeModel.DIRECTIONS.RIGHT,
    d: MazeModel.DIRECTIONS.RIGHT,
    l: MazeModel.DIRECTIONS.RIGHT,
    down: MazeModel.DIRECTIONS.DOWN,
    s: MazeModel.DIRECTIONS.DOWN,
    j: MazeModel.DIRECTIONS.DOWN,
    left: MazeModel.DIRECTIONS.LEFT,
    a: MazeModel.DIRECTIONS.LEFT,
    h: MazeModel.DIRECTIONS.LEFT
  }[keyName] || null;
}

function assumeKeyOnWelcomePage(keyName, isControl) {
  let stageTypeId = KEYS.STAGE_SELECTION[keyName];

  if (stageTypeId) {
    ScreenActionCreators.prepareGame(stageTypeId);
    ScreenActionCreators.changePage('game');
    return true;
  }

  return false;
}

function assumeKeyOnGamePage(keyName, isControl) {
  let gameStore = GameStore.getInstance();

  if (gameStore.isPlaying()) {
    let direction = getDirectionByKeyName(keyName);
    if (direction) {
      if (gameStore.isAssumedPicksMode) {
        GameActionCreators.crushWallByPlayer(direction);
        return true;
      } else {
        GameActionCreators.walkPlayer(direction);
        return true;
      }
    } else if (keyName === 'space') {
      if (gameStore.isAssumedPicksMode) {
        GameActionCreators.cancelPicksMode();
        return true;
      } else {
        GameActionCreators.assumePicksMode();
        return true;
      }
    }
  }

  if (gameStore.isDecided()) {
    if (keyName === 'space') {
      GameActionCreators.resetGame();
      ScreenActionCreators.changePage('welcome');
      return true;
    }
  }

  return false;
}


export function onKeypress({ name, ctrl }) {
  let screenStore = ScreenStore.getInstance();

  let assumeKeyByActivePage = {
    game: assumeKeyOnGamePage,
    welcome: assumeKeyOnWelcomePage
  }[screenStore.pageId];

  if (!assumeKeyByActivePage) {
    ScreenActionCreators.throwRuntimeError(
      new Error(screenStore.pageId + ' is invalid pageId'));
    return;
  }

  if (assumeKeyByActivePage(name, ctrl)) {
    return;
  }

  if (name === 'escape' || ctrl && name === 'c') {
    ScreenActionCreators.exit();
    return;
  }
}
