import chalk from 'chalk';

import ScreenActionCreators from 'actions/ScreenActionCreators';


export function onError(err) {
  console.error(chalk.red(err));
  ScreenActionCreators.throwRuntimeError(err);
}
