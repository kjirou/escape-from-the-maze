import {ACTIONS, EVENTS} from 'consts';
import AppDispatcher from 'dispatcher/AppDispatcher';
import EventManager from 'lib/EventManager';
import Store from 'stores/Store';
import GameStore from 'stores/GameStore';


class ScreenStore extends Store {

  constructor() {
    super();

    this._pageId = 'welcome';

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
      }
    });
  }
}


export default ScreenStore;
