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

var _DialogComponent = require('./DialogComponent');

var _DialogComponent2 = _interopRequireDefault(_DialogComponent);

var _pagesGamePageComponent = require('./pages/GamePageComponent');

var _pagesGamePageComponent2 = _interopRequireDefault(_pagesGamePageComponent);

var _pagesWelcomePageComponent = require('./pages/WelcomePageComponent');

var _pagesWelcomePageComponent2 = _interopRequireDefault(_pagesWelcomePageComponent);

var _consts = require('consts');

var _libEventManager = require('lib/EventManager');

var _libEventManager2 = _interopRequireDefault(_libEventManager);

var _storesDialogStore = require('stores/DialogStore');

var _storesDialogStore2 = _interopRequireDefault(_storesDialogStore);

var _storesGameStore = require('stores/GameStore');

var _storesGameStore2 = _interopRequireDefault(_storesGameStore);

var _storesScreenStore = require('stores/ScreenStore');

var _storesScreenStore2 = _interopRequireDefault(_storesScreenStore);

var PAGE_COMPONENTS = {
  game: _pagesGamePageComponent2['default'],
  welcome: _pagesWelcomePageComponent2['default']
};

function getStateFromStores() {
  var screenStore = _storesScreenStore2['default'].getInstance();
  var dialogStore = _storesDialogStore2['default'].getInstance();
  var gameStore = _storesGameStore2['default'].getInstance();
  return {
    dialogInputValue: dialogStore.dialogInputValue,
    hasBeenDefeat: gameStore.hasBeenDefeat,
    hasBeenVictory: gameStore.hasBeenVictory,
    gameTime: gameStore.gameTime,
    isAssumedPicksMode: gameStore.isAssumedPicksMode,
    isDialogActive: dialogStore.isDialogActive,
    isValidDialogInput: dialogStore.isValidDialogInput,
    mazeContent: gameStore.isStarted() ? gameStore.maze.toContent() : '',
    mazeCount: gameStore.getMazeCount(),
    pageId: screenStore.pageId,
    picksCount: gameStore.picksCount,
    score: gameStore.gameResult ? gameStore.gameResult.calculateScore() : 0,
    runningMazeCount: gameStore.runningMazeCount,
    timeLimit: gameStore.timeLimit
  };
}

function getInitialState() {
  return getStateFromStores();
}

var RootComponent = (function (_Component) {
  _inherits(RootComponent, _Component);

  function RootComponent(props) {
    var _this = this;

    _classCallCheck(this, RootComponent);

    _get(Object.getPrototypeOf(RootComponent.prototype), 'constructor', this).call(this, props);

    this.state = getInitialState();

    var _EventManager$getInstance = _libEventManager2['default'].getInstance();

    var emitter = _EventManager$getInstance.emitter;

    emitter.on(_consts.EVENTS.CHANGE_PAGE, function () {
      _this.setState(getStateFromStores());
    });
    emitter.on(_consts.EVENTS.UPDATE_DIALOG, function () {
      _this.setState(getStateFromStores());
    });
    emitter.on(_consts.EVENTS.UPDATE_MAZE, function () {
      _this.setState(getStateFromStores());
    });
    emitter.on(_consts.EVENTS.UPDATE_GAME_STATUS, function () {
      _this.setState(getStateFromStores());
    });
  }

  _createClass(RootComponent, [{
    key: 'render',
    value: function render() {
      var props = {
        top: 'top',
        left: 'left',
        width: 41,
        height: 22,
        style: {
          fg: 'white',
          bg: 'blue'
        }
      };

      var dialogProps = Object.assign({}, this.state);

      var ActivePageComponent = PAGE_COMPONENTS[this.state.pageId];
      var pageProps = Object.assign({}, this.state);

      return _react2['default'].createElement(
        'box',
        props,
        _react2['default'].createElement(_DialogComponent2['default'], dialogProps),
        _react2['default'].createElement(ActivePageComponent, pageProps)
      );
    }
  }]);

  return RootComponent;
})(_react.Component);

exports['default'] = RootComponent;
module.exports = exports['default'];