import Model from 'models/Model';


export default class GameResultModel extends Model {

  constructor({ timeLimit, lastGameTime }) {
    super();

    this._timeLimit = timeLimit;
    this._lastGameTime = lastGameTime;
  }

  calculateScore() {
    return this._timeLimit - this._lastGameTime;
  }
}
