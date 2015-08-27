import chalk from 'chalk';

import GameActionCreators from 'actions/GameActionCreators';
import GameStore from 'stores/GameStore';


export function onTimer({ value, interval }) {
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

export function onTimerError(err) {
  let {screen} = ScreenManager.getInstance();
  var msg = chalk.red(err);
  console.error(msg);
  screen.debug(msg);
}
