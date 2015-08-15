var generateMaze = require('generate-maze-by-clustering');
var _ = require('lodash');
var keymirror = require('keymirror');
var _s = require('underscore.string');

var Cell = require('lib/cell');
var ThingIndexer = require('lib/thing-indexer');
var WallThing = require('lib/things/wall');


var DIRECTIONS = keymirror({
  UP: null,
  RIGHT: null,
  DOWN: null,
  LEFT: null
});

function createCells(size) {
  return _.range(size[1]).map(function() {
    return _.range(size[0]).map(function() {
      return new Cell();
    });
  });
}

function extentToSize(extent) {
  return extent * 2 + 1;
}

function getRelativePosByDirection(direction) {
  return {
    UP: [-1, 0],
    RIGHT: [0, 1],
    DOWN: [1, 0],
    LEFT: [0, -1]
  }[DIRECTIONS[direction]];
}

function composeCoordinates(startPos, relativePos) {
  return [
    startPos[0] + relativePos[0],
    startPos[1] + relativePos[1]
  ];
}


/**
 * @param {string} mapText
 */
function Maze() {
  this._thingIndexer = new ThingIndexer();
  this._cells = null;
}

/**
 * @param {Array} extent  [extentWidth, extentHeight]
 */
Maze.createByExtent = function createByExtent(extent) {
  var maze = new this();
  maze.includeMapText(generateMaze(extent).toText());
  return maze;
};

Maze.prototype.includeMapText = function includeMapText(mapText) {

  var mapAsCharacters = _s.trim(mapText)
    .split('\n')
    .map(function(row) {
      return row.split('');
    })
  ;
  var width = mapAsCharacters[0].length;
  var height = mapAsCharacters.length;

  this._cells = createCells([width, height]);

  var that = this;
  return _.range(height)
    .map(function(rowIndex) {
      return _.range(width)
        .map(function(columnIndex) {
          var chr = mapAsCharacters[rowIndex][columnIndex];
          if (chr === '#') {
            that.addThing(new WallThing(), [rowIndex, columnIndex]);
          }
        })
      ;
    })
  ;
};

Maze.prototype.getWidth = function getWidth() {
  return this._cells[0].length;
};

Maze.prototype.getHeight = function getHeight() {
  return this._cells.length;
};

Maze.prototype.getSize = function getSize() {
  return [this.getWidth(), this.getHeight()];
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

/*
 * Walk a thing only one step in the direction
 *
 * @param {Thing}
 * @param {string}  DIRECTIONS
 * @return {boolean}  Success or failure
 */
Maze.prototype.walkThing = function walkThing(thing, direction) {
  var fromPos = this._thingIndexer.get(thing.uuid);
  var relativePos = getRelativePosByDirection(direction);
  var toPos = composeCoordinates(fromPos, relativePos);
  if (!this.validateThingMovement(thing, fromPos, toPos)) {
    return false;
  }
  this.moveThing(thing, fromPos, toPos);
  return true;
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
  createCells: createCells,
  extentToSize: extentToSize
});


module.exports = Maze;
