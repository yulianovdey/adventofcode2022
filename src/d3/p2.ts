import { readFileSync } from 'fs';
import { resolve } from 'path';

type CharMap<T> = { [k: string]: T };

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d3/input.txt'), 'utf8').trim().split('\n');

const LOWER = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPER = LOWER.map(l => l.toUpperCase());
const ITEMS = LOWER.concat(UPPER);
const ITEMS_TO_RANK = ITEMS.reduce((a: CharMap<number>, b, index) => {
  a[b] = index + 1;

  return a;
}, {});


function commonKey(maps: string[][]) {
  const counts = {};

  let limit = maps.reduce((a, b) => a + b.length, 0);
  let mapIndex = 0;
  for (let i = 0; i < limit; i++) {
    const map = maps[mapIndex];

    if (!counts[map[i]]) {
      counts[map[i]] = [];
    }

    if (!counts[map[i]][mapIndex]) {
      counts[map[i]][mapIndex] = true;
      if (counts[map[i]].filter(Boolean).length === maps.length) {
        return map[i];
      }
    }

    if (i + 1 === map.length) {
      mapIndex++;
      i = -1;
      limit -= map.length;
    }
  }
}

let total = 0;
for (let i = 0; i < lines.length; i += 3) {
  const [first, second, third] = [lines[i], lines[i + 1], lines[i + 2]];

  const item = commonKey([first, second, third].map(l => l.split('')));

  total += ITEMS_TO_RANK[item];
}

console.log(total);
