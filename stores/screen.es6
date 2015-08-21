import ACTIONS from 'consts/actions';
import EVENTS from 'consts/events';
import Dispatchers from 'dispatchers';
import EventManager from 'lib/event-manager';
import GameStore from 'stores/game';
import Store from 'stores/store';


class ScreenStore extends Store {

  constructor() {
    super();

    this._pageId = 'welcome';

    Object.defineProperty(this, 'pageId', { get() { return this._pageId; } });

    let dispatchers = Dispatchers.getInstance();
    let {emitter} = EventManager.getInstance();
    let gameStore = GameStore.getInstance();
    let dispatchToken0 = dispatchers.register(({action}) => {
      dispatchers.waitFor([
        ...gameStore.dispatchTokens
      ]);

      switch (action.type) {
        case ACTIONS.CHANGE_PAGE:
          this._pageId = action.pageId;
          emitter.emit(EVENTS.CHANGE_PAGE);
          break;
      }
    });
    this.dispatchTokens.push(dispatchToken0);
  }
}


export default ScreenStore;
