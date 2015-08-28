import blessed from 'blessed';
import devnull from 'dev-null';
import _ from 'lodash';
import reactBlessed from 'react-blessed';

import BlessedRootComponent from './blessed/RootComponent';
import ReactBlessedRootComponent from './react-blessed/RootComponent';
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

    let initializeScreen = {
      'blessed': this._initializeBlessedScreen.bind(this),
      'react-blessed': this._initializeReactBlessedScreen.bind(this)
    }[componentMode];

    this._screen = initializeScreen();
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

  _initializeBlessedScreen() {
    let screen = blessed.screen(this._createBlessedOptions());
    // Disable default key bind for debug
    // Ref) blessed/lib/widgets/screen.js#L374
    screen.debugLog.unkey(['q', 'escape'], () => {});
    new BlessedRootComponent({ screen, $parent: screen });
    return screen;
  }

  _initializeReactBlessedScreen() {
    return reactBlessed.render(<RootComponent />, this._createBlessedOptions());
  }
}

Object.assign(Screen, SingletonMixin);
