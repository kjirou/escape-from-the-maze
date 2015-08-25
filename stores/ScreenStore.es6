import {ACTIONS, EVENTS} from 'consts';
import Dispatchers from 'dispatchers';
import EventManager from 'lib/event-manager';
import Store from 'stores/Store';
import GameStore from 'stores/GameStore';


class ScreenStore extends Store {

  constructor() {
    super();

    this._pageId = 'welcome';

    Object.defineProperty(this, 'pageId', { get() { return this._pageId; } });

    let dispatchers = Dispatchers.getInstance();
    let {emitter} = EventManager.getInstance();
    let gameStore = GameStore.getInstance();
    this._dispatchToken = dispatchers.register(({action}) => {
      dispatchers.waitFor([
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
