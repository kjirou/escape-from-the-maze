import _ from 'lodash';
import React, {Component} from 'react';

import variables from '../variables';


export default class GamePageComponent extends Component {

  render() {

    let props = Object.assign({}, variables.pageBoxProps);

    return (
      <box {...props} >
        Game !!!
      </box>
    );
  }
}
