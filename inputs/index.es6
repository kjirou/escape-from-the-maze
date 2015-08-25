import chalk from 'chalk';
import _ from 'lodash';
import Rx from 'rx';

import GameActionCreators from 'actions/GameActionCreators';
import ScreenActionCreators from 'actions/ScreenActionCreators';
import {KEYS} from 'consts';
import SingletonMixin from 'lib/mixins/singleton';
import ScreenManager from 'lib/screen-manager';
import {calculateMillisecondsPerFrame} from 'lib/util';
import MazeModel from 'models/MazeModel';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


function onTimerSourceData({ value, interval }) {
  let gameStore = GameStore.getInstance();
  if (gameStore.isPlaying()) {
    GameActionCreators.forwardGameTimeByFrame();
  }
  if (gameStore.didPlayerGetVictoryJustNow()) {
    if (gameStore.hasNextMaze()) {
      GameActionCreators.advanceToNextMaze();
    } else {
      GameActionCreators.saveVictory();
    }
  } else if (gameStore.didPlayerGetDefeatJustNow()) {
    GameActionCreators.saveDefeat();
  }
}

function onKeypressSourceData({ name, ctrl }) {
  let {screen} = ScreenManager.getInstance();
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

function onSubscribeError(err) {
  var msg = chalk.red('Error: ' + err);
  console.error(msg);
  screen.debug(msg);
}


export default class Inputs {

  constructor() {
    let {screen} = ScreenManager.getInstance();

    let pauser = new Rx.Subject();

    let timerSource = Rx.Observable
      .timer(0, calculateMillisecondsPerFrame())
      .timeInterval()
      .map((data) => {
        pauser.onNext(true);
        return data;
      })
    ;

    let wrappedHandler;
    let keypressSource = Rx.Observable
      .fromEventPattern(
        (handler) => {
          wrappedHandler = function(chr, key) {
            if (!key) {
              key = {
                name: chr,
                ctrl: false
              };
            }
            handler(key);
          };
          screen.addListener('keypress', wrappedHandler);
        },
        () => {
          screen.removeListener('keypress', wrappedHandler);
        }
      )
      .pausable(pauser)
      .filter(function() {
        var isStopped = pauser.isStopped;
        pauser.onNext(false);
        return !isStopped;
      })
    ;

    this._timerSubscription = timerSource.subscribe(
      onTimerSourceData,
      onSubscribeError
    );
    this._keypressSubscription = keypressSource.subscribe(
      onKeypressSourceData,
      onSubscribeError
    );
  }

  _destructor() {
    this._timerSubscription.dispose();
    this._keypressSubscription.dispose();
  }
}

_.assign(Inputs, SingletonMixin);

Inputs._destructInstance = function _destructInstance() {
  if (this._instance) {
    this._instance._destructor();
  }
};
