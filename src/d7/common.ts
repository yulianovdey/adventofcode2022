import { LineIterator } from '../util';

class File {
  constructor(public parent: Directory, public name: string, public size: number) {}
}

export class Directory {
  constructor(public parent: Directory | null, public name: string, public children = {}) {}

  addChild(child) {
    if (!this.children[child.name]) {
      this.children[child.name] = child;
    }
  }

  getChild(name) {
    return this.children[name];
  }

  get size() {
    return Object.values(this.children).reduce((a, b) => a + (b.size || 0), 0);
  }
}

export function getTree() {
  const iterator = new LineIterator(7);
  let root;
  let currentDir;
  let line;

  function next() {
    return line = iterator.next();
  }

  function handleListContents() {
    while (iterator.hasNext() && !iterator.peek().startsWith('$')) {
      next();
      if (line.startsWith('dir')) {
        const dirName = line.substring('dir '.length);

        currentDir.addChild(new Directory(currentDir, dirName));

        continue;
      }

      const [, size, name] = /^(\d+) (.*)$/.exec(line);

      currentDir.addChild(new File(currentDir, name, parseInt(size)));
    }
  }

  while (next() !== null) {
    if (line.startsWith('$ ls')) {
      handleListContents();
    } else if (line.startsWith('$ cd')) {
      const dirName = line.substring('$ cd '.length);

      if (dirName === '..') {
        currentDir = currentDir.parent;
      } else if (!currentDir) {
        root = currentDir = new Directory(null, dirName);
      } else {
        currentDir = currentDir.children[dirName];
      }
    }
  }

  return root;
}
