import _ from 'lodash';

import {ACTIONS, EVENTS} from 'consts';
import AppDispatcher from 'dispatcher/AppDispatcher';
import EventManager from 'lib/EventManager';
import GameStore from 'stores/GameStore';
import Store from 'stores/Store';


class ScreenStore extends Store {

  constructor() {
    super();

    this._pageId = 'welcome';
    this._runtimeErrors = [];

    Object.defineProperty(this, 'pageId', { get() { return this._pageId; } });

    let dispatcher = AppDispatcher.getInstance();
    let {emitter} = EventManager.getInstance();
    let gameStore = GameStore.getInstance();
    this._dispatchToken = dispatcher.register((action) => {
      dispatcher.waitFor([
        gameStore.getDispatchToken()
      ]);

      switch (action.type) {
        case ACTIONS.CHANGE_PAGE:
          this._pageId = action.pageId;
          emitter.emit(EVENTS.CHANGE_PAGE);
          break;
        case ACTIONS.EXIT:
          emitter.emit(EVENTS.EXIT);
          break;
        case ACTIONS.THROW_RUNTIME_ERROR:
          this._runtimeErrors.push(action.err);
          emitter.emit(EVENTS.UPDATE_ERRORS);
          break;
      }
    });
  }

  getLastRuntimeError() {
    return _.last(this._runtimeErrors);
  }
}


export default ScreenStore;
