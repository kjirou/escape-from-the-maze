import blessed from 'blessed';
import chalk from 'chalk';
import devnull from 'dev-null';
import _ from 'lodash';
import React from 'react';
import {render as renderByReactBlessed} from 'react-blessed';

import BlessedRootComponent from './blessed/RootComponent';
import ReactBlessedRootComponent from './react-blessed/RootComponent';
import conf from 'conf';
import {EVENTS} from 'consts';
import EventManager from 'lib/EventManager';
import SingletonMixin from 'lib/mixins/SingletonMixin';
import ScreenStore from 'stores/ScreenStore';


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

    let {emitter} = EventManager.getInstance();
    emitter.on(EVENTS.UPDATE_ERRORS, this._debug.bind(this));
    emitter.on(EVENTS.EXIT, this._exit.bind(this));
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
    let screen = renderByReactBlessed(<ReactBlessedRootComponent />, this._createBlessedOptions());
    screen.debugLog.unkey(['q', 'escape'], () => {});
    return screen;
  }

  _exit() {
    process.stdin.pause();
    process.exit(0);
  }

  _debug() {
    let screenStore = ScreenStore.getInstance();
    var err = screenStore.getLastRuntimeError();
    this._screen.debug(chalk.red(err));
  }
}

Object.assign(Screen, SingletonMixin);
