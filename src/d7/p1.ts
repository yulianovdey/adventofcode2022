import { getTree, Directory } from './common';

let total = 0;
function findTotal(dir) {
  const children = Object.values(dir.children);

  for (const child of children.filter(c => c instanceof Directory)) {
    const { size } = child;
    total += size <= 100000 ? size : 0;

    findTotal(child);
  }
}
findTotal(getTree());

console.log(total);
