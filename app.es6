import _ from 'lodash';

import ScreenComponent from 'components/screen';
import AppDispatcher from 'dispatcher/AppDispatcher';
import Inputs from 'inputs';
import EventManager from 'lib/event-manager';
import SingletonMixin from 'lib/mixins/singleton';
import ScreenManager from 'lib/screen-manager';
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
      () => Inputs.getInstance(),
      () => GameStore.getInstance(),
      () => ScreenStore.getInstance()
    ].forEach(task => task());
  }

  static purgeInstances() {
    [
      () => ScreenStore.clearInstance(),
      () => GameStore.clearInstance(),
      () => Inputs.clearInstance(),
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
