import GameActionCreators from 'actions/GameActionCreators';
import ScreenActionCreators from 'actions/ScreenActionCreators';
import {KEYS} from 'consts';
import ScreenManager from 'lib/ScreenManager';
import MazeModel from 'models/MazeModel';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


export function onKeypress({ name, ctrl }) {
  let screenStore = ScreenStore.getInstance();
  let gameStore = GameStore.getInstance();

  switch (screenStore.pageId) {
    case 'welcome':
      let stageTypeId = KEYS.STAGE_SELECTION[name];
      if (stageTypeId) {
        ScreenActionCreators.prepareGame(stageTypeId);
        ScreenActionCreators.changePage('game');
        return;
      }
      break;
    case 'game':
      if (gameStore.isPlaying()) {
        let direction = {
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
        }[name];
        if (direction) {
          if (gameStore.isAssumedPicksMode) {
            GameActionCreators.crushWallByPlayer(direction);
          } else {
            GameActionCreators.walkPlayer(direction);
          }
          return;
        } else if (name === 'space') {
          if (gameStore.isAssumedPicksMode) {
            GameActionCreators.cancelPicksMode();
          } else {
            GameActionCreators.assumePicksMode();
          }
          return;
        }
      } else if (gameStore.isDecided()) {
        if (name === 'space') {
          GameActionCreators.resetGame();
          ScreenActionCreators.changePage('welcome');
        }
      }
      break;
    default:
      throw new Error(screenStore.pageId + ' is invalid pageId');
  }

  if (name === 'escape' || ctrl && name === 'c') {
    process.stdin.pause();
    process.exit(0);
    return;
  }
}
