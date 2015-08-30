import ScreenActionCreators from 'actions/ScreenActionCreators';
import Screen from 'components/Screen';
import conf from 'conf';
import AppDispatcher from 'dispatcher/AppDispatcher';
import AppInput from 'input/AppInput';
import EventManager from 'lib/EventManager';
import SingletonMixin from 'lib/mixins/SingletonMixin';
import DialogStore from 'stores/DialogStore';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


export default class App {

  /*
   * Initialize unique instances in consideration of the order
   */
  static initializeInstances() {
    [
      () => EventManager.getInstance(),
      () => AppDispatcher.getInstance(),
      () => DialogStore.getInstance(),
      () => GameStore.getInstance(),
      () => ScreenStore.getInstance(),
      () => AppInput.getInstance()
    ].forEach(task => task());
  }

  static purgeInstances() {
    [
      () => Screen.clearInstance(),
      () => AppInput.clearInstance(),
      () => ScreenStore.clearInstance(),
      () => GameStore.clearInstance(),
      () => AppDispatcher.clearInstance(),
      () => EventManager.clearInstance()
    ].forEach(task => task());
  }

  constructor() {
    this.constructor.initializeInstances();
  }

  start() {
    Screen.getInstance({ componentMode: conf.componentMode });
    ScreenActionCreators.changePage('welcome');
  }
}

Object.assign(App, SingletonMixin);
