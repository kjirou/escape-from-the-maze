import ScreenComponent from 'components/screen';
import Inputs from 'inputs';
import ScreenManager from 'lib/screen-manager';
import ScreenStore from 'stores/screen';


export var run = function run() {
  ScreenManager.getInstance();
  Inputs.getInstance();
  ScreenStore.getInstance();

  let screenComponent = new ScreenComponent();
  screenComponent.render();
}
