import ScreenComponent from 'components/blessed/ScreenComponent';
import AppDispatcher from 'dispatcher/AppDispatcher';
import AppInput from 'input/AppInput';
import EventManager from 'lib/EventManager';
import ScreenManager from 'lib/ScreenManager';
import SingletonMixin from 'lib/mixins/SingletonMixin';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


export default class App {

  /*
   * Initialize unique instances in consideration of the order
   */
  static initializeInstances() {
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

  constructor() {
    this.constructor.initializeInstances();
  }

  run() {
    let screenComponent = new ScreenComponent();
    screenComponent.render();
  }
}

Object.assign(App, SingletonMixin);
