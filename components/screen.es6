import blessed from 'blessed';

import Component from 'components/component';
import EVENTS from 'consts/events';
import GamePageComponent from 'components/pages/game';
import WelcomePageComponent from 'components/pages/welcome';
import EventManager from 'lib/event-manager';
import ScreenManager from 'lib/screen-manager';
import ScreenStore from 'stores/screen';


class ScreenComponent extends Component {

  constructor() {
    super();

    let {screen} = ScreenManager.getInstance();
    let {emitter} = EventManager.getInstance();

    this._$el = blessed.box({
      parent: screen,
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

    emitter.on(EVENTS.CHANGE_PAGE, this.render.bind(this));
  }

  render() {
    let {screen} = ScreenManager.getInstance();
    let screenStore = ScreenStore.getInstance();
    let page = this._pages[screenStore.pageId];
    Object.keys(this._pages).forEach((key) => {
      this._pages[key].$el.hide();
    });
    page.$el.show();
    page.$el.focus();
    screen.render();
  }
}


export default ScreenComponent;
