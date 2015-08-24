import Model from 'models/Model';


export default class ThingIndexerModel extends Model {

  constructor() {
    super();

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
