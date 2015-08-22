import _ from 'lodash';

import PageComponent from 'components/pages/page';
import {KEYS} from 'consts';
import {stageList} from 'lib/stages';


class WelcomePageComponent extends PageComponent {

  constructor(...args) {
    super(...args);

    let invertedKeys = _.invert(KEYS.STAGE_SELECTION);
    let content = '{magenta-fg}Escape From The Maze{/}\n\n';
    content += 'Push a {green-fg}key{/} for stage selection.\n\n';
    content += stageList.map((Stage) => {
      return `[{green-fg}${invertedKeys[Stage.typeId]}{/}] ${Stage.getName()}: ${Stage.description}`;
    }).join('\n');
    this.$el.setContent(content);
  }
}


export default WelcomePageComponent;
