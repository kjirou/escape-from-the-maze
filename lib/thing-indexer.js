function ThingIndexer() {
  this._indexes = {};
}

ThingIndexer.prototype.update = function update(uuid, pos) {
  this._indexes[uuid] = pos;
};

ThingIndexer.prototype.remove = function remove(uuid) {
  delete this._indexes[uuid];
};

ThingIndexer.prototype.get = function get(uuid) {
  return this._indexes[uuid] || null;
};

ThingIndexer.prototype.has = function has(uuid) {
  return uuid in this._indexes;
};


module.exports = ThingIndexer;
