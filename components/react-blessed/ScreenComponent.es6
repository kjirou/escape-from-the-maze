import blessed from 'blessed';
import chalk from 'chalk';
import React, {Component} from 'react';
import {render} from 'react-blessed';

import {EVENTS} from 'consts';
import ScreenStore from 'stores/ScreenStore';





//export default class ScreenComponent extends Component {
//
//  constructor(...args) {
//    super(...args);
//
//    this._$el = blessed.box({
//      parent: this.screen,
//      top: 'top',
//      left: 'left',
//      width: 41,
//      height: 22,
//      tags: true,
//      style: {
//        fg: 'white',
//        bg: 'blue'
//      }
//    });
//
//    this._pages = {
//      game: new GamePageComponent(this._$el),
//      welcome: new WelcomePageComponent(this._$el)
//    };
//
//    this.emitter.on(EVENTS.UPDATE_ERRORS, this.renderDebugConsole.bind(this));
//    this.emitter.on(EVENTS.EXIT, this.exit.bind(this));
//    this.emitter.on(EVENTS.CHANGE_PAGE, this.render.bind(this));
//  }
//
//  exit() {
//    process.stdin.pause();
//    process.exit(0);
//  }
//
//  renderDebugConsole() {
//    let screenStore = ScreenStore.getInstance();
//    var err = screenStore.getLastRuntimeError();
//    this.screen.debug(chalk.red(err));
//  }
//
//  render() {
//    let screenStore = ScreenStore.getInstance();
//    let page = this._pages[screenStore.pageId];
//    Object.keys(this._pages).forEach((key) => {
//      this._pages[key].$el.hide();
//    });
//    page.$el.show();
//    page.$el.focus();
//    this.screen.render();
//  }
//}
