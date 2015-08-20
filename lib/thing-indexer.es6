class ThingIndexer {

  constructor() {
    this._indexes = {};
  }

  update(id, pos) {
    this._indexes[id] = pos;
  }

  remove(id) {
    delete this._indexes[id];
  }

  get(id) {
    return this._indexes[id] || null;
  }

  has(id) {
    return id in this._indexes;
  }

  getIds() {
    return Object.keys(this._indexes);
  }
}


export default ThingIndexer;
