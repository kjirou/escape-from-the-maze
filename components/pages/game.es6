import blessed from 'blessed';

import PageComponent from 'components/pages/page';
import EVENTS from 'consts/events';
import GameStore from 'stores/game';


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

    this._$stateBarBox = blessed.box({
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
      content: '99:99:99.9999'
    });

    this.emitter.on(EVENTS.UPDATE_MAZE, this.renderMazeBox.bind(this));
    //this.emitter.on(EVENTS.UPDATE_MAZE_CLOCK, this.renderStateBarBox.bind(this));
  }

  renderMazeBox() {
    let gameStore = GameStore.getInstance();
    this._$mazeBox.setContent(gameStore.maze.toContent());
    this.screen.render();
  }

  //renderStateBarBox() {
  //  let gameStore = GameStore.getInstance();
  //  this.screen.render();
  //}

  render() {
    this.renderMazeBox();
    //this.renderStateBarBox();
  }
}
