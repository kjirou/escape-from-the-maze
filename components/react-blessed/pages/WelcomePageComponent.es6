import _ from 'lodash';
import React, {Component} from 'react';

import variables from '../variables';
import {KEYS} from 'consts';
import {stageList} from 'lib/stages';


export default class WelcomePageComponent extends Component {

  render() {

    let content = '';

    // Title
    content += '{magenta-fg}Escape From The Maze{/}\n\n';

    // Overview
    content += 'The purpose of the game is to escape from the maze by operating the "{magenta-fg}@{/}" ';
    content += 'by [{green-fg}wasd{/}] [{green-fg}hjkl{/}] or {green-fg}arrow keys{/}. ';
    content += 'Futher, by using [{green-fg}space{/}], you can also break the wall by consuming a pickaxe.\n';
    content += '{yellow-fg}--help{/} option shows more helps!\n\n';

    // Choices of stages
    let invertedKeys = _.invert(KEYS.STAGE_SELECTION);
    content += 'Push a {green-fg}key{/} for stage selection.\n\n';
    content += stageList.map((Stage) => {
      return `[{green-fg}${invertedKeys[Stage.typeId]}{/}] ${Stage.getName()}: ${Stage.description}`;
    }).join('\n');

    let props = Object.assign({}, variables.pageBoxProps);

    return (
      <box {...props} >
        {content}
      </box>
    );
  }
}
