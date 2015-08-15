var generateMaze = require('generate-maze-by-clustering');
var _ = require('lodash');
var _s = require('underscore.string');

var Cell = require('lib/cell');
var ThingIndexer = require('lib/thing-indexer');
var WallThing = require('lib/things/wall');


var DIRECTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

function extentToSize(extent) {
  return extent * 2 + 1;
};


/**
 * @param {Array} extent  [width-extent, height-extent]
 */
function Maze(extent) {
  this._extent = extent;
  this._thingIndexer = new ThingIndexer();
  this._cells = this._createCells(this._extent);
  this._mapText = generateMaze(this._extent).toText();
  this._includeMapText(this._mapText);
}

Maze.prototype.getWidth = function getWidth() {
  return this._cells[0].length;
};

Maze.prototype.getHeight = function getHeight() {
  return this._cells.length;
};

Maze.prototype.getSize = function getSize() {
  return [this.getWidth(), this.getHeight()];
};

Maze.prototype._createCells = function _createCells(extent) {
  var width = extentToSize(extent[0]);
  var height = extentToSize(extent[1]);
  return _.range(height).map(function() {
    return _.range(width).map(function() {
      return new Cell();
    });
  });
};

Maze.prototype._includeMapText = function _includeMapText(mapText) {
  var that = this;
  var rowIndex = -1;
  return _s.trim(mapText)
    .split('\n')
    .map(function(mapLineText) {
      rowIndex += 1;
      var columnIndex = -1;
      return mapLineText.split('').map(function(chr) {
        columnIndex += 1;
        if (chr === '#') {
          that.addThing(new WallThing(), [rowIndex, columnIndex]);
        }
      });
    })
  ;
};

/**
 * @param {Array<number>} cellIndex  e.g. [rowIndex, columnIndex]
 * @return {Cell|null}
 */
Maze.prototype.getCell = function getCell(pos) {
  var rowIndex = pos[0];
  var columnIndex = pos[1];
  var row = this._cells[rowIndex];
  if (row === undefined) { return null; }
  return row[columnIndex] || null;
};

Maze.prototype.getCellOrError = function getCellOrError(pos) {
  var cell = this.getCell(pos);
  if (cell) {
    return cell;
  } else {
    throw new Error('Can not get the cell by [' + pos.toString() + ']');
  }
};

Maze.prototype.addThing = function addThing(thing, pos) {
  if (this._thingIndexer.has(thing.uuid)) {
    throw new Error('The thing is existing');
  }
  var cell = this.getCellOrError(pos);
  cell.setThing(thing);
  this._thingIndexer.update(thing.uuid, pos);
};

Maze.prototype.removeThing = function removeThing(thing, pos) {
  if (!this._thingIndexer.has(thing.uuid)) {
    throw new Error('Can not find the thing by uuid=' + thing.uuid);
  }
  var cell = this.getCellOrError(pos);
  cell.removeThing(thing);
  this._thingIndexer.remove(thing.uuid);
};

/*
 * @return {boolean}
 */
Maze.prototype.validateThingMovement = function validateThingMovement(thing, fromPos, toPos) {
  var fromCell = this.getCell(fromPos);
  var toCell = this.getCell(toPos);
  return !!(fromCell && toCell && fromCell.hasThing(thing) && toCell.isPassable());
};

Maze.prototype.moveThing = function moveThing(thing, fromPos, toPos) {
  if (!this.validateThingMovement(thing, fromPos, toPos)) {
    throw new Error('Invalid thing movement');
  }
  this.removeThing(thing, fromPos);
  this.addThing(thing, toPos);
};

Maze.prototype.movePlayer = function movePlayer(direction) {
};

Maze.prototype.toContent = function toContent() {
  return this._cells.map(function(rowCells) {
    return rowCells.map(function(cell) {
      return cell.toContent();
    }).join('');
  }).join('\n');
};


_.assign(Maze, {
  DIRECTIONS: DIRECTIONS,
  extentToSize: extentToSize
});


module.exports = Maze;
