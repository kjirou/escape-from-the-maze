import PageComponent from 'components/pages/page';
import {KEYS} from 'consts';
import {stageList} from 'lib/stages';


class WelcomePageComponent extends PageComponent {

  constructor(...args) {
    super(...args);

    let content = '{magenta-fg}Escape From The Maze{/}\n\n';
    content += 'Push a {green-fg}key{/} for stage selection.\n\n';
    content += stageList.map((Stage, i) => {
      let text = `[{green-fg}${KEYS.STAGE_SELECTION[Stage.typeId]}{/}] ${Stage.getName()}: ${Stage.description}`;
      return text;
    }).join('\n');
    this.$el.setContent(content);
  }
}


export default WelcomePageComponent;
