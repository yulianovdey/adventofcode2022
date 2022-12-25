import { parseLines } from '../util';
import { Visitor, updateTail } from './common';

const lines = parseLines(9);

const h = new Visitor();
const t = new Visitor();
const visited = {'0:0': 1};
function update(x, y) {
  updateTail(t, x, y);
  visited[t.position.join(':')] = 1;
}
for (const line of lines) {
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
