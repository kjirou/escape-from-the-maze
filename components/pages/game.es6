import blessed from 'blessed';

import PageComponent from 'components/pages/page';
import EVENTS from 'consts/events';
import GameStore from 'stores/GameStore';


export default class GamePageComponent extends PageComponent {

  constructor(...args) {
    super(...args);

    this._$mazeBox = blessed.box({
      parent: this.$el,
      top: 'top',
      left: 'left',
      width: '100%',
      height: 21,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      }
    });

    this._$resultBox = blessed.box({
      parent: this._$mazeBox,
      top: 'center',
      left: 'center',
      width: 21,
      height: 7,
      tags: true,
      border: {
        type: 'line'
      },
      align: 'center',
      valign: 'middle',
      style: {
        fg: 'white',
        bg: 'black'
      },
      hidden: true
    });

    this._$statusBarBox = blessed.box({
      parent: this.$el,
      top: this._$mazeBox.height,
      left: 'left',
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      },
      content: 'Time: 0'
    });

    this.emitter.on(EVENTS.UPDATE_MAZE, this.renderMazeBox.bind(this));
    this.emitter.on(EVENTS.UPDATE_GAME_STATUS, this.renderStatusBarBox.bind(this));
  }

  renderMazeBox() {
    let gameStore = GameStore.getInstance();

    if (gameStore.isStarted()) {
      this._$mazeBox.setContent(gameStore.maze.toContent());
    }

    if (this._$resultBox.hidden && gameStore.hasBeenVictory) {
      this._$resultBox.setContent('Escape success!\n\nPush [space]');
      this._$resultBox.style.border = { fg: 'green' };
      this._$resultBox.show();
    } else if (this._$resultBox.hidden && gameStore.hasBeenDefeat) {
      this._$resultBox.setContent('Escape failure..\n\nPush [space]');
      this._$resultBox.style.border = { fg: 'red' };
      this._$resultBox.show();
    } else {
      this._$resultBox.hide();
    }

    this.screen.render();
  }

  // FIXME: Too heavy
  renderStatusBarBox() {
    let gameStore = GameStore.getInstance();
    let gameTimeBySeconds = ~~(gameStore.gameTime / 1000);
    let timeLimitBySeconds = ~~(gameStore.timeLimit / 1000);
    let picksContent = `Picks: ${gameStore.picksCount}`;
    let content = `${gameStore.runningMazeCount}/${gameStore.getMazeCount()}F, ` +
      `Time: ${gameTimeBySeconds}/${timeLimitBySeconds}, `;
    if (gameStore.isAssumedPicksMode) {
      content += `{green-fg}${picksContent}{/}`;
    } else {
      content += picksContent;
    }
    this._$statusBarBox.setContent(content);
    this.screen.render();
  }

  render() {
    this.renderMazeBox();
    this.renderStatusBarBox();
  }
}
