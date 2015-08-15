var generateMaze = require('generate-maze-by-clustering');
var _ = require('lodash');
var _s = require('underscore.string');

var Cell = require('lib/cell');
var PlayerThing = require('lib/things/player');
var UpstairsThing = require('lib/things/upstairs');
var WallThing = require('lib/things/wall');


/**
 * @param {Array} extent  [width-extent, height-extent]
 */
function Maze(extent, options) {
  options = _.assign({
    withPlayer: false,
    withGoal: false
  }, options || {});

  this.extent = extent;
  this._cells = this._createCells(this.extent);

  if (options.withPlayer) {
    this.getStartCell().setThing(new PlayerThing());
  }
  if (options.withGoal) {
    this.getGoalCell().setThing(new UpstairsThing());
  }
}

Maze.prototype.getSize = function getSize() {
  return [
    Maze.extentToSize(this.extent[0]),
    Maze.extentToSize(this.extent[1])
  ];
};

Maze.prototype.getWidth = function getWidth() {
  return this.getSize()[0];
};

Maze.prototype.getHeight = function getHeight() {
  return this.getSize()[1];
};

Maze.prototype._createCells = function _createCells(extent) {
  var mazeText = generateMaze(extent).toText();
  return _s.trim(mazeText)
    .split('\n')
    .map(function(mazeLineText) {
      return mazeLineText.split('').map(function(chr) {
        var cell = new Cell();
        if (chr === '#') {
          cell.setThing(new WallThing());
        }
        return cell;
      });
    })
  ;
};

/**
 * @param {Array<number>} cellIndex  e.g. [rowIndex, columnIndex]
 * @return {Cell|null}
 */
Maze.prototype.getCell = function getCell(cellIndex) {
  var rowIndex = cellIndex[0];
  var columnIndex = cellIndex[1];
  var row = this._cells[rowIndex];
  if (row === undefined) { return null; }
  return row[columnIndex] || null;
};

Maze.prototype.getCellOrError = function getCellOrError(cellIndex) {
  var cell = this.getCell(cellIndex);
  if (cell) {
    return cell;
  } else {
    throw new Error('Can not get the cell by [' + cellIndex.toString() + ']');
  }
};

Maze.prototype.getStartCell = function getStartCell() {
  return this.getCellOrError([1, 1]);
};

Maze.prototype.getGoalCell = function getGoalCell() {
  return this.getCellOrError([this.getHeight() - 2, this.getWidth() - 2]);
};

/*
 * @return {boolean}
 */
Maze.prototype.validateThingMovement = function validateThingMovement(thing, fromCellIndex, toCellIndex) {
  var fromCell = this.getCell(fromCellIndex);
  var toCell = this.getCell(toCellIndex);
  return !!(fromCell && toCell && fromCell.hasThing(thing) && toCell.isPassable());
};

Maze.prototype.moveThing = function moveThing(thing, fromCellIndex, toCellIndex) {
  var fromCell = this.getCellOrError(fromCellIndex);
  var toCell = this.getCellOrError(toCellIndex);
  if (!fromCell.hasThing(thing)) {
    throw new Error('Does not have the thing');
  } else if (!toCell.isPassable()) {
    throw new Error('Can not move to the cell');
  }
  fromCell.removeThing(thing);
  toCell.setThing(thing);
};

Maze.prototype.toContent = function toContent() {
  return this._cells.map(function(rowCells) {
    return rowCells.map(function(cell) {
      return cell.toContent();
    }).join('');
  }).join('\n');
};

Maze.extentToSize = function(extent) {
  return extent * 2 + 1;
};


module.exports = Maze;
