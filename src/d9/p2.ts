import { parseLines } from '../util';
import { Visitor, updateTail } from './common';

const lines = parseLines(9);

export function updateAll(rope, x, y) {
  for (let i = 1; i < rope.length; i++) {
    updateTail(rope[i], rope[i - 1].x, rope[i - 1].y);
  }
}

const r = new Array(10).fill(undefined).map(() => new Visitor());
const h = r[0];
const t = r[r.length - 1];
const visited = {'0:0': 1};

function update(x, y) {
  updateAll(r, x, y);
  visited[t.position.join(':')] = 1;
}

for (const [index, line] of lines.entries()) {
  let [direction, steps] = line.split(' ');
  steps = parseInt(steps);

  switch (direction) {
    case 'R': {
      h.moveX(steps, update);
      break;
    }
    case 'L': {
      h.moveX(-steps, update);
      break;
    }
    case 'D': {
      h.moveY(-steps, update);
      break;
    }
    case 'U': {
      h.moveY(steps, update);
      break;
    }
  }
}

console.log(Object.keys(visited).length);
