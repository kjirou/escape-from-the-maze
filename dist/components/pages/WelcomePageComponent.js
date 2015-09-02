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

var _consts = require('consts');

var _libStages = require('lib/stages');

var WelcomePageComponent = (function (_Component) {
  _inherits(WelcomePageComponent, _Component);

  function WelcomePageComponent() {
    _classCallCheck(this, WelcomePageComponent);

    _get(Object.getPrototypeOf(WelcomePageComponent.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(WelcomePageComponent, [{
    key: 'render',
    value: function render() {

      var content = '';

      // Title
      content += '{magenta-fg}Escape From The Maze{/}\n\n';

      // Overview
      content += 'The purpose of the game is to escape from the maze by operating the "{magenta-fg}@{/}" ';
      content += 'by [{green-fg}wasd{/}] [{green-fg}hjkl{/}] or {green-fg}arrow keys{/}. ';
      content += 'Futher, by using [{green-fg}space{/}], you can also break the wall by consuming a pickaxe.\n';
      content += '{yellow-fg}--help{/} option shows more helps!\n\n';

      // Choices of stages
      var invertedKeys = _lodash2['default'].invert(_consts.KEYS.STAGE_SELECTION);
      content += 'Push a {green-fg}key{/} for stage selection.\n\n';
      content += _libStages.stageList.map(function (Stage) {
        return '[{green-fg}' + invertedKeys[Stage.typeId] + '{/}] ' + Stage.getName() + ': ' + Stage.description;
      }).join('\n');

      var props = Object.assign({}, _variables2['default'].pageBoxProps);

      return _react2['default'].createElement(
        'box',
        props,
        content
      );
    }
  }]);

  return WelcomePageComponent;
})(_react.Component);

exports['default'] = WelcomePageComponent;
module.exports = exports['default'];