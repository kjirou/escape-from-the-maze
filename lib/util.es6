import chalk from 'chalk';

import conf from 'conf';


export function createCounter(start = 1) {
  start -= 1;
  return () => start += 1;
}

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

export function createHelpText() {
  let playerSymbol = chalk.magenta.bgBlack('@');
  let wallSymbol = chalk.white.bgBlack('#');
  let pickaxeSymbol = chalk.yellow.bgBlack('T');
  let bonusTime5Symbol = chalk.green.bgBlack('5');
  let penaltyTime3Symbol = chalk.red.bgBlack('3');

  let lines = [
    '# Escape From The Maze - Help',
    '',
    '## Operation of player',
    '- You can move the player(' + playerSymbol + ') by [w][a][s][d], [h][j][k][l] or [arrow keys].',
    '- If you move after you press the [space], you can break the wall(' + wallSymbol + ') to consume one pickaxe.',
    '',
    '## Victory or defat, and score',
    '- It is a victory if escape the maze within the time limit.',
    '- The number of maze is different for each stage.',
    '- If you win, the remaining milliseconds will be the score.',
    '',
    '## Treasures',
    '- "' + pickaxeSymbol + '" You get a extra pickaxe.',
    '- "' + bonusTime5Symbol + '" Time limit is increased 5 seconds.',
    '- "' + penaltyTime3Symbol + '" Time limit is reduced 3 seconds.',
    '',
    '## Others',
    '- You can look ranking by `npm run ranking`.',
  ];
  return lines.join('\n');
}
