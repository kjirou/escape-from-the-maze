import ThingModel from 'models/things/ThingModel';


export default class WallThingModel extends ThingModel {

  constructor() {
    super();

    this._symbol = '#';
    this._isPassable = false;
  }
}

Object.assign(WallThingModel, {
  typeId: 'wall'
});
