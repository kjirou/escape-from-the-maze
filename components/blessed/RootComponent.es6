import blessed from 'blessed';
import chalk from 'chalk';

import Component from './Component';
import GamePageComponent from './pages/GamePageComponent';
import WelcomePageComponent from './pages/WelcomePageComponent';
import {EVENTS} from 'consts';
import ScreenStore from 'stores/ScreenStore';


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

    this.emitter.on(EVENTS.UPDATE_ERRORS, this.renderDebugConsole.bind(this));
    this.emitter.on(EVENTS.EXIT, this.exit.bind(this));
    this.emitter.on(EVENTS.CHANGE_PAGE, this.render.bind(this));
  }

  exit() {
    process.stdin.pause();
    process.exit(0);
  }

  renderDebugConsole() {
    let screenStore = ScreenStore.getInstance();
    var err = screenStore.getLastRuntimeError();
    this.screen.debug(chalk.red(err));
  }

  render() {
    let screenStore = ScreenStore.getInstance();
    let $page = this._$pages[screenStore.pageId];
    Object
      .keys(this._$pages)
      .filter((key) => key !== screenStore.pageId)
      .forEach((key) => this._$pages[key].$el.hide())
    ;
    $page.$el.show();
    $page.$el.focus();
    this.screen.render();
  }
}
