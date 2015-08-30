import _ from 'lodash';
import React, {Component} from 'react';

import variables from './variables';


export default class DialogComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let content = '';
    content += '\n';
    content += 'What\'s your name?\n';
    content += '\n';
    content += '\n';
    content += '\n';
    content += 'by /{green-fg}[-_a-zA-Z0-9]{open}1,12{close}{/}/\n';
    content += '\n';
    content += 'Submit is [{green-fg}enter{/}]\n';
    content += 'Cancel is [{green-fg}escape{/}]\n';

    let props = {
      ref: 'root',
      top: 'center',
      left: 'center',
      width: 33,
      height: 12,
      tags: true,
      border: {
        type: 'line'
      },
      align: 'center',
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'white'
        }
      },
      content: content,
      hidden: !this.props.isDialogActive,
    };
    if (this.props.isDialogActive) {
      this.refs.root.setFront();
    }

    let inputBoxProps = {
      top: 3,
      left: 'center',
      width: 25,
      height: 1,
      style: {
        fg: (this.props.isValidDialogInput) ? 'black' : 'red',
        bg: 'white',
      },
      content: this.props.dialogInputValue,
    };

    return (
      <box {...props} >
        <box {...inputBoxProps} />
      </box>
    );
  }
}

Object.assign(DialogComponent, {

  propTypes: {
    isDialogActive: React.PropTypes.bool.isRequired,
    dialogInputValue: React.PropTypes.string.isRequired,
    isValidDialogInput: React.PropTypes.bool.isRequired,
  }
});
