'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _generateMazeByClustering = require('generate-maze-by-clustering');

var _generateMazeByClustering2 = _interopRequireDefault(_generateMazeByClustering);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _underscoreString = require('underscore.string');

var _underscoreString2 = _interopRequireDefault(_underscoreString);

var _modelsCellModel = require('models/CellModel');

var _modelsCellModel2 = _interopRequireDefault(_modelsCellModel);

var _modelsModel = require('models/Model');

var _modelsModel2 = _interopRequireDefault(_modelsModel);

var _modelsThingIndexerModel = require('models/ThingIndexerModel');

var _modelsThingIndexerModel2 = _interopRequireDefault(_modelsThingIndexerModel);

var _modelsThingsWallThingModel = require('models/things/WallThingModel');

var _modelsThingsWallThingModel2 = _interopRequireDefault(_modelsThingsWallThingModel);

var DIRECTIONS = (0, _keymirror2['default'])({
  UP: null,
  RIGHT: null,
  DOWN: null,
  LEFT: null
});

function createCells(size) {
  return _lodash2['default'].range(size[1]).map(function () {
    return _lodash2['default'].range(size[0]).map(function () {
      return new _modelsCellModel2['default']();
    });
  });
}

function extentToSize(extent) {
  return extent * 2 + 1;
}

function getRelativePosByDirection(direction) {
  return ({
    UP: [-1, 0],
    RIGHT: [0, 1],
    DOWN: [1, 0],
    LEFT: [0, -1]
  })[DIRECTIONS[direction]];
}

function composeCoordinates(startPos, relativePos) {
  return [startPos[0] + relativePos[0], startPos[1] + relativePos[1]];
}

var MazeModel = (function (_Model) {
  _inherits(MazeModel, _Model);

  function MazeModel() {
    _classCallCheck(this, MazeModel);

    _get(Object.getPrototypeOf(MazeModel.prototype), 'constructor', this).call(this);

    this._thingIndexer = new _modelsThingIndexerModel2['default']();
    this._cells = null;
  }

  /**
   * @param {Array} extent  [extentWidth, extentHeight]
   */

  _createClass(MazeModel, [{
    key: 'includeMapText',
    value: function includeMapText(mapText) {
      var mapAsCharacters = _underscoreString2['default'].trim(mapText).split('\n').map(function (row) {
        return row.split('');
      });
      var width = mapAsCharacters[0].length;
      var height = mapAsCharacters.length;

      this._cells = createCells([width, height]);

      var that = this;
      return _lodash2['default'].range(height).map(function (rowIndex) {
        return _lodash2['default'].range(width).map(function (columnIndex) {
          var chr = mapAsCharacters[rowIndex][columnIndex];
          if (chr === '#') {
            that.addThing(new _modelsThingsWallThingModel2['default'](), [rowIndex, columnIndex]);
          }
        });
      });
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this._cells[0].length;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this._cells.length;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return [this.getWidth(), this.getHeight()];
    }

    /**
     * @param {Array<number>} cellIndex  e.g. [rowIndex, columnIndex]
     * @return {Cell|null}
     */
  }, {
    key: 'getCell',
    value: function getCell(pos) {
      var rowIndex = pos[0];
      var columnIndex = pos[1];
      var row = this._cells[rowIndex];
      if (row === undefined) {
        return null;
      }
      return row[columnIndex] || null;
    }
  }, {
    key: 'getCellOrError',
    value: function getCellOrError(pos) {
      var cell = this.getCell(pos);
      if (cell) {
        return cell;
      } else {
        throw new Error('Can not get the cell by [' + pos.toString() + ']');
      }
    }
  }, {
    key: 'addThing',
    value: function addThing(thing, pos) {
      if (this._thingIndexer.has(thing.uuid)) {
        throw new Error('The thing is existing');
      }
      var cell = this.getCellOrError(pos);
      cell.setThing(thing);
      this._thingIndexer.update(thing.uuid, pos);
    }
  }, {
    key: 'removeThing',
    value: function removeThing(thing, pos) {
      if (!this._thingIndexer.has(thing.uuid)) {
        throw new Error('Can not find the thing by uuid=' + thing.uuid);
      }
      var cell = this.getCellOrError(pos);
      cell.removeThing(thing);
      this._thingIndexer.remove(thing.uuid);
    }

    /*
     * @return {boolean}
     */
  }, {
    key: 'validateThingMovement',
    value: function validateThingMovement(thing, fromPos, toPos) {
      var fromCell = this.getCell(fromPos);
      var toCell = this.getCell(toPos);
      return !!(fromCell && toCell && fromCell.hasThing(thing) && toCell.isPassable());
    }
  }, {
    key: 'moveThing',
    value: function moveThing(thing, fromPos, toPos) {
      if (!this.validateThingMovement(thing, fromPos, toPos)) {
        throw new Error('Invalid thing movement');
      }
      this.removeThing(thing, fromPos);
      this.addThing(thing, toPos);
    }

    /*
     * Walk a thing only one step in the direction
     *
     * @param {Thing}
     * @param {string}  DIRECTIONS
     * @return {boolean}  Success or failure
     */
  }, {
    key: 'walkThing',
    value: function walkThing(thing, direction) {
      var fromPos = this._thingIndexer.get(thing.uuid);
      var relativePos = getRelativePosByDirection(direction);
      var toPos = composeCoordinates(fromPos, relativePos);
      if (!this.validateThingMovement(thing, fromPos, toPos)) {
        return false;
      }
      this.moveThing(thing, fromPos, toPos);
      return true;
    }

    /*
     * @return {Array|null}
     */
  }, {
    key: 'searchThingPos',
    value: function searchThingPos(thing) {
      return this._thingIndexer.get(thing.uuid);
    }

    /*
     * Are things on the cell?
     *
     * @return {boolean}
     */
  }, {
    key: 'areThingsOn',
    value: function areThingsOn(pos, things) {
      var _this = this;

      return things.every(function (thing) {
        var thingPos = _this._thingIndexer.get(thing.uuid);
        return _lodash2['default'].isEqual(pos, thingPos);
      });
    }
  }, {
    key: 'areThingsStayingTogether',
    value: function areThingsStayingTogether(things) {
      var pos = this._thingIndexer.get(things[0].uuid);
      return this.areThingsOn(pos, things.slice(1));
    }
  }, {
    key: 'getBlankPosList',
    value: function getBlankPosList() {
      var posList = [];
      this._cells.forEach(function (rowCells, rowIndex) {
        rowCells.forEach(function (cell, columnIndex) {
          if (cell.getThings().length === 0) {
            posList.push([rowIndex, columnIndex]);
          }
        });
      });
      return posList;
    }
  }, {
    key: 'toContent',
    value: function toContent() {
      return this._cells.map(function (rowCells) {
        return rowCells.map(function (cell) {
          return cell.toContent();
        }).join('');
      }).join('\n');
    }
  }], [{
    key: 'createByExtent',
    value: function createByExtent(extent) {
      var maze = new this();
      maze.includeMapText((0, _generateMazeByClustering2['default'])(extent).toText());
      return maze;
    }
  }]);

  return MazeModel;
})(_modelsModel2['default']);

exports['default'] = MazeModel;

Object.assign(MazeModel, {
  DIRECTIONS: DIRECTIONS,
  composeCoordinates: composeCoordinates,
  createCells: createCells,
  extentToSize: extentToSize,
  getRelativePosByDirection: getRelativePosByDirection
});
module.exports = exports['default'];