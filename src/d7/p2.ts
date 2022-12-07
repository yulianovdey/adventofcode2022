import { getTree, Directory } from './common';

let root = getTree();
const needed = 30000000 - (70000000 - root?.size);
let answer = root;
function findDir(dir) {
  const children = Object.values(dir.children);

  for (const child of children.filter(c => c instanceof Directory)) {
    const { size } = child;
    if (size >= needed && size < answer.size) {
      answer = child;
    }

    findDir(child);
  }
}
findDir(root);

console.log(answer.size);
