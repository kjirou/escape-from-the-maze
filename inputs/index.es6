import blessed from 'blessed';
import chalk from 'chalk';
import _ from 'lodash';
import Rx from 'rx';

import GameActionCreators from 'actions/game-action-creators';
import ScreenActionCreators from 'actions/screen-action-creators';
import conf from 'conf';
import SingletonMixin from 'lib/mixins/singleton';
import ScreenManager from 'lib/screen-manager';
import Maze from 'lib/maze';
import GameStore from 'stores/game';
import ScreenStore from 'stores/screen';


function calculateMillisecondsPerFrame() {
  return ~~(1000 / conf.fps);
}

function onKeypressSourceData({ name, ctrl }) {
  let {screen} = ScreenManager.getInstance();
  let screenStore = ScreenStore.getInstance();
  let gameStore = GameStore.getInstance();

  screen.debug(name, ctrl);

  switch (screenStore.pageId) {
    case 'welcome':
      if (name === 'space') {
        ScreenActionCreators.prepareGame();
        ScreenActionCreators.changePage('game');
        return;
      }
      break;
    case 'game':
      if (gameStore.isStarted()) {
        let direction = {
          up: Maze.DIRECTIONS.UP,
          w: Maze.DIRECTIONS.UP,
          k: Maze.DIRECTIONS.UP,
          right: Maze.DIRECTIONS.RIGHT,
          d: Maze.DIRECTIONS.RIGHT,
          l: Maze.DIRECTIONS.RIGHT,
          down: Maze.DIRECTIONS.DOWN,
          s: Maze.DIRECTIONS.DOWN,
          j: Maze.DIRECTIONS.DOWN,
          left: Maze.DIRECTIONS.LEFT,
          a: Maze.DIRECTIONS.LEFT,
          h: Maze.DIRECTIONS.LEFT
        }[name];
        if (direction) {
          GameActionCreators.walkPlayer(direction);
          return;
        }
      }
      break;
    default:
      throw new Error(screenStore.pageId + ' is invalid pageId');
      break;
  }

  if (name === 'escape' || ctrl && name === "c") {
    process.stdin.pause();
    process.exit(0);
    return;
  }
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

    var cnt = -1;
    timerSource.subscribe(
      function onTimerSourceData({ value, interval }) {
        cnt += 1;
        if (cnt % 50 === 0) {
          screen.debug('Frame count:', value);
        }
      },
      function onTimerSourceError(err) {
        var msg = chalk.red('Error: ' + err);
        console.log(msg);
        screen.debug(msg);
      }
    );

    keypressSource.subscribe(
      onKeypressSourceData,
      function onKeypressSourceError(err) {
        var msg = chalk.red('Error: ' + err);
        console.log(msg);
        screen.debug(msg);
      }
    );
  }
}

_.assign(Inputs, SingletonMixin);
