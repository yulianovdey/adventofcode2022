import { LineIterator } from '../util';

const lines = new LineIterator(10);

let line;
let cycles = 0;
let x = 1;
let p1 = 0;
const queue = [];
while (lines.hasNext() || queue.length) {
  cycles += 1;
  if ([20, 60, 100, 140, 180, 220].includes(cycles)) {
    p1 += (cycles) * x;
  }
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

console.log(p1);
