import conf from 'conf';


export function calculateMillisecondsPerFrame() {
  return ~~(1000 / conf.fps);
}

/*
 * Convert from list<object> to dict by property-name
 *
 * @param {string} propertyName
 * @return {Object}
 */
export function dictionarize(list, propertyName) {
  let dict = {};
  list.forEach(v => dict[v[propertyName]] = v);
  return dict;
}
