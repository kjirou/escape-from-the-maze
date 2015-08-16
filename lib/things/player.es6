import _ from 'lodash';

import Thing from 'lib/things/thing';


class PlayerThing extends Thing {

  constructor() {
    super();

    this._symbol = '@';
  }

  toContent() {
    return '{green-fg}' + this._symbol + '{/}';
  }
}
_.assign(PlayerThing, Thing);

PlayerThing.typeId = 'player';


export default PlayerThing;
