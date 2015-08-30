import _ from 'lodash';

import {ACTIONS, EVENTS} from 'consts';
import AppDispatcher from 'dispatcher/AppDispatcher';
import EventManager from 'lib/EventManager';
import GameStore from 'stores/GameStore';
import Store from 'stores/Store';


const DIALOG_INPUT_MATCHER = /^[a-zA-Z0-9]{1,12}$/;
function validateDialogInput(input) {
  return DIALOG_INPUT_MATCHER.test(input);
}


class ScreenStore extends Store {

  constructor() {
    super();

    this._pageId = 'welcome';
    this._runtimeErrors = [];
    this._isDialogActive = false;
    this._dialogInputValue = '';
    this._isValidDialogInput = false;

    Object.defineProperty(this, 'pageId', { get() { return this._pageId; } });
    Object.defineProperty(this, 'isDialogActive', { get() { return this._isDialogActive; } });
    Object.defineProperty(this, 'dialogInputValue', { get() { return this._dialogInputValue; } });
    Object.defineProperty(this, 'isValidDialogInput', { get() { return this._isValidDialogInput; } });

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
        case ACTIONS.CLOSE_DIALOG:
          this._isDialogActive = false;
          this._dialogInputValue = '';
          emitter.emit(EVENTS.UPDATE_DIALOG);
          break;
        case ACTIONS.DELETE_LAST_INPUT_FROM_DIALOG:
          this._dialogInputValue = this._dialogInputValue.slice(0, -1);
          this._isValidDialogInput = validateDialogInput(this._dialogInputValue);
          emitter.emit(EVENTS.UPDATE_DIALOG);
          break;
        case ACTIONS.EXIT:
          emitter.emit(EVENTS.EXIT);
          break;
        case ACTIONS.INPUT_KEY_TO_DIALOG:
          this._dialogInputValue += action.keyName;
          this._isValidDialogInput = validateDialogInput(this._dialogInputValue);
          emitter.emit(EVENTS.UPDATE_DIALOG);
          break;
        case ACTIONS.OPEN_DIALOG:
          this._isDialogActive = true;
          this._dialogInputValue = '';
          this._isValidDialogInput = false;
          emitter.emit(EVENTS.UPDATE_DIALOG);
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
