import ThingModel from 'models/things/ThingModel';


export default class PicksThingModel extends ThingModel {

  constructor() {
    super();

    this._symbol = 'T';
    this._isPickable = true;
  }

  toContent() {
    return '{yellow-fg}' + this._symbol + '{/}';
  }
}

Object.assign(PicksThingModel, {
  typeId: 'picks'
});
