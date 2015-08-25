import blessed from 'blessed';

import Component from 'components/component';
import EVENTS from 'consts/events';
import GamePageComponent from 'components/pages/game';
import WelcomePageComponent from 'components/pages/welcome';
import ScreenStore from 'stores/ScreenStore';


export default class ScreenComponent extends Component {

  constructor() {
    super();

    this._$el = blessed.box({
      parent: this.screen,
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

    this._pages = {
      game: new GamePageComponent(this._$el),
      welcome: new WelcomePageComponent(this._$el)
    };

    this.emitter.on(EVENTS.CHANGE_PAGE, this.render.bind(this));
  }

  render() {
    let screenStore = ScreenStore.getInstance();
    let page = this._pages[screenStore.pageId];
    Object.keys(this._pages).forEach((key) => {
      this._pages[key].$el.hide();
    });
    page.$el.show();
    page.$el.focus();
    this.screen.render();
  }
}
