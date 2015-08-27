import blessed from 'blessed';
import devnull from 'dev-null';
import _ from 'lodash';

import conf from 'conf';
import SingletonMixin from 'lib/mixins/SingletonMixin';


export default class ScreenManager {

  constructor(options = {}) {
    options = Object.assign({
      debug: true
    }, options);

    let blessedOptions = _.pick(options, 'debug');
    if (conf.ignoreScreenOutput) {
      blessedOptions.output = devnull();
    }

    let screen = blessed.screen(blessedOptions);

    screen.title = 'Escape From The Maze';

    this._screen = screen;

    Object.defineProperty(this, 'screen', { get() { return this._screen; } });
  }
}

Object.assign(ScreenManager, SingletonMixin);
