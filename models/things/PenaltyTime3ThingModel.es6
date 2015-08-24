import ThingModel from 'models/things/ThingModel';


export default class PenaltyTime3ThingModel extends ThingModel {

  constructor() {
    super();

    this._symbol = '3';
    this._isPickable = true;
  }

  toContent() {
    return '{red-fg}' + this._symbol + '{/}';
  }
}

Object.assign(PenaltyTime3ThingModel, {
  typeId: 'penalty_time_3'
});
