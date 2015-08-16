import _ from 'lodash';

import Thing from 'lib/things/thing';


class WallThing extends Thing {

  constructor() {
    super();

    this._symbol = '#';
    this._isPassable = false;
  }
}
_.assign(WallThing, Thing);

WallThing.typeId = 'wall';


export default WallThing;
