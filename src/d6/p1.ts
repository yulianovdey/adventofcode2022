import { readFileSync } from 'fs';
import { resolve } from 'path';
import { unique } from '../util';

const input = readFileSync(resolve(process.env['PWD'] as string, 'src/d6/input.txt'), 'utf8').split('');

for (let i = 0; i < input.length; i++) {
  if (unique(input.slice(i, i + 4)).length === 4) {
    console.log(i + 4);
    break;
  }
}
