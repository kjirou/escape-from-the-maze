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

var _modelsModel = require('models/Model');

var _modelsModel2 = _interopRequireDefault(_modelsModel);

var CellModel = (function (_Model) {
  _inherits(CellModel, _Model);

  function CellModel() {
    _classCallCheck(this, CellModel);

    _get(Object.getPrototypeOf(CellModel.prototype), 'constructor', this).call(this);

    this._things = [];
  }

  _createClass(CellModel, [{
    key: 'getThings',
    value: function getThings() {
      return this._things;
    }
  }, {
    key: 'getThing',
    value: function getThing() {
      return this.getThings()[0] || null;
    }
  }, {
    key: 'getThingOrError',
    value: function getThingOrError() {
      var thing = this.getThing();
      if (thing) {
        return thing;
      } else {
        throw new Error('Can not get a thing');
      }
    }
  }, {
    key: 'findThing',
    value: function findThing(thing) {
      return _lodash2['default'].find(this._things, function (thing_) {
        return thing === thing_;
      }) || null;
    }
  }, {
    key: 'findThingOrError',
    value: function findThingOrError(thing) {
      var thing_ = this.findThing(thing);
      if (thing_) {
        return thing_;
      } else {
        throw new Error('Can not find the thing');
      }
    }
  }, {
    key: 'hasThing',
    value: function hasThing(thing) {
      return !!this.findThing(thing);
    }
  }, {
    key: 'setThing',
    value: function setThing(thing) {
      if (this.hasThing(thing)) {
        throw new Error('The thing is duplicated');
      }
      this._things.push(thing);
    }

    /*
     * @param {Thing} thing
     * @return {boolean} Removed or not removed
     */
  }, {
    key: 'removeThing',
    value: function removeThing(thing) {
      var removed = _lodash2['default'].remove(this._things, function (thing_) {
        return thing === thing_;
      });
      return removed.length > 0;
    }
  }, {
    key: 'isPassable',
    value: function isPassable() {
      if (this._things.length === 0) {
        return true;
      }
      return this._things.every(function (thing) {
        return thing.isPassable();
      });
    }
  }, {
    key: 'toContent',
    value: function toContent() {
      if (this._things.length > 0) {
        return this._things[0].toContent();
      } else {
        return ' ';
      }
    }
  }]);

  return CellModel;
})(_modelsModel2['default']);

exports['default'] = CellModel;
module.exports = exports['default'];