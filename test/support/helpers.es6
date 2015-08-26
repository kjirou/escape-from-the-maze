import path from 'path';


export function heading(filePath) {
  let root = process.env.NODE_PATH.split(':')[0];
  let relativePath = path.relative(root, filePath);
  relativePath = relativePath.replace(/^test\//, '');
  relativePath = relativePath.replace(/\.es6$/, '');
  return relativePath;
}
