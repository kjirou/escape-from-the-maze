import blessed from 'blessed';
import devnull from 'dev-null';
import _ from 'lodash';

import BlessedRootComponent from './blessed/RootComponent';
//import ReactBlessedRootComponent from './react-blessed/RootComponent';
import conf from 'conf';
import EventManager from 'lib/EventManager';
import SingletonMixin from 'lib/mixins/SingletonMixin';


const COMPONENT_MODES = [
  'blessed',
  'react-blessed'
];


export default class Screen {

  constructor({ componentMode }) {

    if (!COMPONENT_MODES.some((v) => componentMode === v)) {
      throw new Error(`${componentMode} is invalid component-mode`);
    }
    this._componentMode = componentMode;

    let screen;
    switch (this._componentMode) {
      case 'blessed':
        screen = this._createBlessedScreen();
        break;
      case 'react-blessed':
        screen = this._createReactBlessedScreen();
        break;
    }
    this._screen = screen;

    Object.defineProperty(this, 'screen', { get() { return this._screen; } });
  }

  _createBlessedOptions() {
    let options = {
      debug: true,
      title: 'Escape From The Maze'
    };

    if (conf.ignoreScreenOutput) {
      options.output = devnull();
    }

    return options;
  }

  _createBlessedScreen() {
    let screen = blessed.screen(this._createBlessedOptions());
    new BlessedRootComponent({ screen, $parent: screen });
    return screen;
  }

  _createReactBlessedScreen() {
  }

  render() {
    switch (this._componentMode) {
      case 'blessed':
      case 'react-blessed':
        this._screen.render();
        break;
    }
  }
}

Object.assign(Screen, SingletonMixin);
