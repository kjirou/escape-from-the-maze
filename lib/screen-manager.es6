import blessed from 'blessed';
import _ from 'lodash';

import SingletonMixin from 'lib/mixins/singleton';


class ScreenManager {

  constructor() {

    let screen = blessed.screen({
      debug: true
    });

    screen.title = 'Escape From The Maze';

    this._screen = screen;

    Object.defineProperty(this, 'screen', { get() { return this._screen; } });
  }
}
_.assign(ScreenManager, SingletonMixin);


export default ScreenManager;
