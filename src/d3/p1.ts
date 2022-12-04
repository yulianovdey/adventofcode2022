import { readFileSync } from 'fs';
import { resolve } from 'path';

type CharMap<T> = { [k: string]: T };

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d3/input.txt'), 'utf8').trim();

const LOWER = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPER = LOWER.map(l => l.toUpperCase());
const ITEMS = LOWER.concat(UPPER);
const ITEMS_TO_RANK = ITEMS.reduce((a: CharMap<number>, b, index) => {
  a[b] = index + 1;

  return a;
}, {});


function mapFromChars(chars: string)  {
  return chars.split('').reduce((a: CharMap<boolean>, b) => {
    a[b] = true;

    return a;
  }, {});
}

function commonKey(map1: CharMap<any>, map2: CharMap<any>): string {
  for (const k of Object.keys(map1)) {
    if (typeof map2[k] !== 'undefined') {
      return k;
    }
  }

  throw new Error('No common key.');
}

let total = 0;
for (const line of lines.split('\n')) {
  const size = line.length / 2;
  const [first, second] = [line.substring(0, size), line.substring(size)];
  const item = commonKey(mapFromChars(first), mapFromChars(second));
  total += ITEMS_TO_RANK[item]!;
}

console.log(total);
