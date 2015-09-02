'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _modelsModel = require('models/Model');

var _modelsModel2 = _interopRequireDefault(_modelsModel);

var ThingIndexerModel = (function (_Model) {
  _inherits(ThingIndexerModel, _Model);

  function ThingIndexerModel() {
    _classCallCheck(this, ThingIndexerModel);

    _get(Object.getPrototypeOf(ThingIndexerModel.prototype), 'constructor', this).call(this);

    this._indexes = {};
  }

  _createClass(ThingIndexerModel, [{
    key: 'update',
    value: function update(id, pos) {
      this._indexes[id] = pos;
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      delete this._indexes[id];
    }
  }, {
    key: 'get',
    value: function get(id) {
      return this._indexes[id] || null;
    }
  }, {
    key: 'has',
    value: function has(id) {
      return id in this._indexes;
    }
  }, {
    key: 'getIds',
    value: function getIds() {
      return Object.keys(this._indexes);
    }
  }]);

  return ThingIndexerModel;
})(_modelsModel2['default']);

exports['default'] = ThingIndexerModel;
module.exports = exports['default'];