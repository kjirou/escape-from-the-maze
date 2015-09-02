'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _variables = require('../variables');

var _variables2 = _interopRequireDefault(_variables);

function generateStatusBarContent(_ref) {
  var runningMazeCount = _ref.runningMazeCount;
  var mazeCount = _ref.mazeCount;
  var timeLimit = _ref.timeLimit;
  var gameTime = _ref.gameTime;
  var picksCount = _ref.picksCount;
  var isAssumedPicksMode = _ref.isAssumedPicksMode;

  var gameTimeBySeconds = ~ ~(gameTime / 1000);
  var timeLimitBySeconds = ~ ~(timeLimit / 1000);

  var content = runningMazeCount + '/' + mazeCount + 'F, ' + ('Time: ' + gameTimeBySeconds + '/' + timeLimitBySeconds + ', ');

  var picksContent = 'Pickaxe: ' + picksCount;
  if (isAssumedPicksMode) {
    content += '{green-fg}' + picksContent + '{/}';
  } else {
    content += picksContent;
  }

  return content;
}

function generateVictoryResultBoxContent(_ref2) {
  var score = _ref2.score;

  return 'Escape success!\n\nScore: ' + score + '\n\nSend to server? [{green-fg}Y{/}/{green-fg}n{/}]';
}

function generateDefeatResultBoxContent() {
  return 'Escape failure..\n\nPush [{green-fg}enter{/}]';
}

var GamePageComponent = (function (_Component) {
  _inherits(GamePageComponent, _Component);

  function GamePageComponent(props) {
    _classCallCheck(this, GamePageComponent);

    _get(Object.getPrototypeOf(GamePageComponent.prototype), 'constructor', this).call(this, props);
  }

  _createClass(GamePageComponent, [{
    key: 'render',
    value: function render() {

      var props = Object.assign({}, _variables2['default'].pageBoxProps);

      var mazeBoxProps = {
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

      var resultBoxProps = {
        top: 'center',
        left: 'center',
        width: 27,
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

      var statusBarBoxProps = {
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

      return _react2['default'].createElement(
        'box',
        props,
        _react2['default'].createElement(
          'box',
          mazeBoxProps,
          _react2['default'].createElement('box', resultBoxProps)
        ),
        _react2['default'].createElement('box', statusBarBoxProps)
      );
    }
  }]);

  return GamePageComponent;
})(_react.Component);

exports['default'] = GamePageComponent;

Object.assign(GamePageComponent, {

  propTypes: {
    gameTime: _react2['default'].PropTypes.number.isRequired,
    hasBeenDefeat: _react2['default'].PropTypes.bool.isRequired,
    hasBeenVictory: _react2['default'].PropTypes.bool.isRequired,
    isAssumedPicksMode: _react2['default'].PropTypes.bool.isRequired,
    mazeCount: _react2['default'].PropTypes.number.isRequired,
    mazeContent: _react2['default'].PropTypes.string.isRequired,
    picksCount: _react2['default'].PropTypes.number.isRequired,
    runningMazeCount: _react2['default'].PropTypes.number.isRequired,
    score: _react2['default'].PropTypes.number.isRequired,
    timeLimit: _react2['default'].PropTypes.number.isRequired
  }
});
module.exports = exports['default'];