import _ from 'lodash';
import React, {Component} from 'react';

import variables from '../variables';


function generateStatusBarContent({
  runningMazeCount, mazeCount, timeLimit, gameTime, picksCount, isAssumedPicksMode
}) {

  let gameTimeBySeconds = ~~(gameTime / 1000);
  let timeLimitBySeconds = ~~(timeLimit / 1000);

  let content = `${runningMazeCount}/${mazeCount}F, ` +
    `Time: ${gameTimeBySeconds}/${timeLimitBySeconds}, `;

  let picksContent = `Picks: ${picksCount}`;
  if (isAssumedPicksMode) {
    content += `{green-fg}${picksContent}{/}`;
  } else {
    content += picksContent;
  }

  return content;
}

function generateVictoryResultBoxContent({ score }) {
  return `Escape success!\n\nScore: ${score}\n\nPush [enter]`;
}

function generateDefeatResultBoxContent() {
  return 'Escape failure..\n\nPush [{green-fg}enter{/}]';
}


export default class GamePageComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    let props = Object.assign({}, variables.pageBoxProps);

    let mazeBoxProps = {
      key: 'maze',
      top: 'top',
      left: 'left',
      width: '100%',
      height: 21,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      },
      content: this.props.mazeContent
    };

    let resultBoxProps = {
      top: 'center',
      left: 'center',
      width: 21,
      height: 9,
      tags: true,
      border: {
        type: 'line'
      },
      align: 'center',
      valign: 'middle',
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'green'
        }
      },
      hidden: true
    };

    if (this.props.hasBeenVictory) {
      Object.assign(resultBoxProps, {
        content: generateVictoryResultBoxContent(this.props),
        hidden: false
      });
    } else if (this.props.hasBeenDefeat) {
      Object.assign(resultBoxProps, {
        content: generateDefeatResultBoxContent(),
        hidden: false
      });
      resultBoxProps.style.border.fg = 'red';
    }

    let statusBarBoxProps = {
      key: 'status_bar',
      top: mazeBoxProps.height,
      left: 'left',
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      },
      content: generateStatusBarContent(this.props)
    };

    return (
      <box {...props} >
        <box {...mazeBoxProps}>
          <box {...resultBoxProps} />
        </box>
        <box {...statusBarBoxProps} />
      </box>
    );
  }
}

Object.assign(GamePageComponent, {

  propTypes: {
    gameTime: React.PropTypes.number.isRequired,
    hasBeenDefeat: React.PropTypes.bool.isRequired,
    hasBeenVictory: React.PropTypes.bool.isRequired,
    isAssumedPicksMode: React.PropTypes.bool.isRequired,
    mazeCount: React.PropTypes.number.isRequired,
    mazeContent: React.PropTypes.string.isRequired,
    picksCount: React.PropTypes.number.isRequired,
    runningMazeCount: React.PropTypes.number.isRequired,
    score: React.PropTypes.number.isRequired,
    timeLimit: React.PropTypes.number.isRequired
  }
});
