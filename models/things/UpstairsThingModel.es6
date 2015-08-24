import ThingModel from 'models/things/ThingModel';


export default class UpstairsThingModel extends ThingModel {

  constructor() {
    super();

    this._symbol = '<';
  }

  toContent() {
    return '{magenta-fg}' + this._symbol + '{/}';
  }
}

Object.assign(UpstairsThingModel, {
  typeId: 'upstairs'
});
