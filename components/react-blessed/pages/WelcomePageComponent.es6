import _ from 'lodash';
import React, {Component} from 'react';

import variables from '../variables';
import {KEYS} from 'consts';
import {stageList} from 'lib/stages';


export default class WelcomePageComponent extends Component {

  render() {

    let invertedKeys = _.invert(KEYS.STAGE_SELECTION);
    let content = '{magenta-fg}Escape From The Maze{/}\n\n';
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
