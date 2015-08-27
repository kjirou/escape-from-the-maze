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
