import { LineIterator } from '../util';

const lines = new LineIterator(10);

const screen = new Array(6 * 40).fill(undefined);

let line;
let x = 1;
const queue = [];
for (let cycle = 1; cycle < screen.length; cycle++) {
  const spriteMid = 40 * Math.floor((cycle - 1) / 40) + x;
  const spritePositions = [spriteMid - 1, spriteMid, spriteMid + 1];
  screen[cycle - 1] = spritePositions.includes(cycle - 1) ? 1 : 0;
  console.log(cycle, spritePositions, x, screen[cycle - 1]);
  if (queue.length) {
    x += queue.pop();
    continue;
  }
  line = lines.next();
  if (line !== 'noop') {
    const [_, change] = line.split(' ');
    queue.push(parseInt(change));
  }
}

for (let i = 0; i < screen.length; i+=40) {
  const replaced = screen.slice(i, i + 40).map(p => p ? '#' : '.').join('');
  console.log(replaced);
}
