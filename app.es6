import _ from 'lodash';

import ScreenComponent from 'components/screen';
import AppDispatcher from 'dispatcher/AppDispatcher';
import AppInput from 'input/AppInput';
import EventManager from 'lib/EventManager';
import ScreenManager from 'lib/ScreenManager';
import SingletonMixin from 'lib/mixins/singleton';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


export default class App {

  constructor() {
    this._initializeInstances();
  }

  /*
   * Initialize unique instances in consideration of the order
   */
  _initializeInstances() {
    [
      () => EventManager.getInstance(),
      () => ScreenManager.getInstance(),
      () => AppDispatcher.getInstance(),
      () => AppInput.getInstance(),
      () => GameStore.getInstance(),
      () => ScreenStore.getInstance()
    ].forEach(task => task());
  }

  static purgeInstances() {
    [
      () => ScreenStore.clearInstance(),
      () => GameStore.clearInstance(),
      () => AppInput.clearInstance(),
      () => AppDispatcher.clearInstance(),
      () => ScreenManager.clearInstance(),
      () => EventManager.clearInstance()
    ].forEach(task => task());
  }

  run() {
    let screenComponent = new ScreenComponent();
    screenComponent.render();
  }
}

_.assign(App, SingletonMixin);
