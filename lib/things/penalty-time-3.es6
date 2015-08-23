import Thing from 'lib/things/thing';


export default class PenaltyTime3Thing extends Thing {

  constructor() {
    super();

    this._symbol = '3';
    this._isPickable = true;
  }

  toContent() {
    return '{red-fg}' + this._symbol + '{/}';
  }
}

Object.assign(PenaltyTime3Thing, {
  typeId: 'penalty_time_3'
});
