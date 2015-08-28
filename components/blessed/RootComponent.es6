import blessed from 'blessed';

import Component from './Component';
import GamePageComponent from './pages/GamePageComponent';
import WelcomePageComponent from './pages/WelcomePageComponent';
import {EVENTS} from 'consts';


export default class RootComponent extends Component {

  constructor(...args) {
    super(...args);

    this.$el = blessed.box({
      parent: this.$parent,
      top: 'top',
      left: 'left',
      width: 41,
      height: 22,
      tags: true,
      style: {
        fg: 'white',
        bg: 'blue'
      }
    });

    this._$pages = {
      game: new GamePageComponent({ screen: this.screen, $parent: this.$el }),
      welcome: new WelcomePageComponent({ screen: this.screen, $parent: this.$el })
    };

    this.emitter.on(EVENTS.CHANGE_PAGE, this.render.bind(this));
  }

  prepareRendering() {
    Object.keys(this._$pages).forEach((pageId) => {
      this._$pages[pageId].prepareRendering();
    });
  }
}
