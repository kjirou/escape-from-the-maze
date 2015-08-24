import ThingModel from 'models/things/ThingModel';


export default class BonusTime5ThingModel extends ThingModel {

  constructor() {
    super();

    this._symbol = '5';
    this._isPickable = true;
  }

  toContent() {
    return '{green-fg}' + this._symbol + '{/}';
  }
}

Object.assign(BonusTime5ThingModel, {
  typeId: 'bonus_time_5'
});
