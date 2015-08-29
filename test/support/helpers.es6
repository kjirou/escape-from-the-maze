import path from 'path';

import conf from 'conf';


export function heading(filePath) {
  let relativePath = path.relative(conf.root, filePath);
  relativePath = relativePath.replace(/^test\//, '');
  relativePath = relativePath.replace(/\.es6$/, '');
  return relativePath;
}
