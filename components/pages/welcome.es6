import blessed from 'blessed';

import ScreenActionCreators from 'actions/screen-action-creators';
import PageComponent from 'components/pages/page';


class WelcomePageComponent extends PageComponent {

  constructor(...args) {
    super(...args);

    this.$el.setContent('Escape From The Maze\n\n  Push [space] to start');

    this.$el.key('space', () => {
      ScreenActionCreators.changePage('game');
    });
  }
}


export default WelcomePageComponent;
