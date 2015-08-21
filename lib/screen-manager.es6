import blessed from 'blessed';
import devnull from 'dev-null';
import _ from 'lodash';

import conf from 'conf';
import SingletonMixin from 'lib/mixins/singleton';


export default class ScreenManager {

  constructor(options = {}) {
    options = _.assign({
      debug: true
    }, options);

    if (conf.ignoreScreenOutput) {
      options.output = devnull();
    }

    let screen = blessed.screen(options);

    screen.title = 'Escape From The Maze';

    this._screen = screen;

    Object.defineProperty(this, 'screen', { get() { return this._screen; } });
  }
}

_.assign(ScreenManager, SingletonMixin);
