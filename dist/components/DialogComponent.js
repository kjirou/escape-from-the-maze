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

var _variables = require('./variables');

var _variables2 = _interopRequireDefault(_variables);

var DialogComponent = (function (_Component) {
  _inherits(DialogComponent, _Component);

  function DialogComponent(props) {
    _classCallCheck(this, DialogComponent);

    _get(Object.getPrototypeOf(DialogComponent.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DialogComponent, [{
    key: 'render',
    value: function render() {

      var content = '';
      content += '\n';
      content += 'What\'s your name?\n';
      content += '\n';
      content += '\n';
      content += '\n';
      content += 'by /{green-fg}[-_a-zA-Z0-9]{open}1,12{close}{/}/\n';
      content += '\n';
      content += 'Submit is [{green-fg}enter{/}]\n';
      content += 'Cancel is [{green-fg}escape{/}]\n';

      var props = {
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
        hidden: !this.props.isDialogActive
      };
      if (this.props.isDialogActive) {
        this.refs.root.setFront();
      }

      var inputBoxProps = {
        top: 3,
        left: 'center',
        width: 25,
        height: 1,
        style: {
          fg: this.props.isValidDialogInput ? 'black' : 'red',
          bg: 'white'
        },
        content: this.props.dialogInputValue
      };

      return _react2['default'].createElement(
        'box',
        props,
        _react2['default'].createElement('box', inputBoxProps)
      );
    }
  }]);

  return DialogComponent;
})(_react.Component);

exports['default'] = DialogComponent;

Object.assign(DialogComponent, {

  propTypes: {
    isDialogActive: _react2['default'].PropTypes.bool.isRequired,
    dialogInputValue: _react2['default'].PropTypes.string.isRequired,
    isValidDialogInput: _react2['default'].PropTypes.bool.isRequired
  }
});
module.exports = exports['default'];