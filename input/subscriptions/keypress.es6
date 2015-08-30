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

function acceptKeyOnWelcomePage(keyName, isControl) {
  let stageTypeId = KEYS.STAGE_SELECTION[keyName];

  if (stageTypeId) {
    ScreenActionCreators.prepareGame(stageTypeId);
    ScreenActionCreators.changePage('game');
    return true;
  }

  return false;
}

function acceptKeyOnGamePage(keyName, isControl) {
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

  let backToWelcomePage = () => {
    GameActionCreators.resetGame();
    ScreenActionCreators.changePage('welcome');
  };

  if (gameStore.hasBeenVictory) {
    if (keyName === 'y' || keyName === 'enter') {
      ScreenActionCreators.openDialog();
      return true;
    } else if (keyName === 'n') {
      backToWelcomePage();
      return true;
    }
  } else if (gameStore.hasBeenDefeat) {
    if (keyName === 'enter') {
      backToWelcomePage();
      return true;
    }
  }

  return false;
}


export function onKeypress({ name, ctrl, sequence }) {
  let screenStore = ScreenStore.getInstance();
  let gameStore = GameStore.getInstance();

  if (screenStore.isDialogActive) {
    // TODO: Generalize dialog's action
    if (name === 'enter') {
      if (!screenStore.isValidDialogInput) {
        return;
      }
      if (
        screenStore.pageId === 'game' &&
        screenStore.isValidDialogInput &&
        gameStore.hasBeenVictory
      ) {
        ScreenActionCreators.closeDialog();
        GameActionCreators.resetGame();
        ScreenActionCreators.changePage('welcome');
        return;
      }
      ScreenActionCreators.closeDialog();
      return;
    } else if (name === 'escape') {
      ScreenActionCreators.closeDialog();
      return;
    } else if (name === 'backspace' || name === 'delete') {
      ScreenActionCreators.deleteLastInputFromDialog();
      return;
    } else if (!ctrl) {
      ScreenActionCreators.inputKeyToDialog(sequence);
      return;
    }
  }

  if (name === 'escape' || ctrl && name === 'c') {
    ScreenActionCreators.exit();
    return;
  }

  let acceptKeyByActivePage = {
    game: acceptKeyOnGamePage,
    welcome: acceptKeyOnWelcomePage
  }[screenStore.pageId];

  if (!acceptKeyByActivePage) {
    ScreenActionCreators.throwRuntimeError(
      new Error(screenStore.pageId + ' is invalid pageId'));
    return;
  }

  if (acceptKeyByActivePage(name, ctrl)) {
    return;
  }
}
