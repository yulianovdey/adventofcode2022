import { readFileSync } from 'fs';
import { resolve } from 'path';

export function unique<T>(arr: T[]): T[] {
  const results = [];
  const map = {};

  for (const item of arr) {
    if (!map[item]) {
      map[item] = 1;
      results.push(item);
    }
  }

  return results;
}

export function parseLines(dayNum) {
  return readFileSync(resolve(process.env['PWD'] as string, `src/d${dayNum}/input.txt`), 'utf8').trim().split('\n');
}

export function linesToMatrix(lines: string[]): string[][] {
  const matrix = [];

  for (const line of lines) {
    matrix.push(line.split(''));
  }

  return matrix;
}

export class LineIterator {
  private current = -1;

  constructor(dayNum) {
    this.lines = parseLines(dayNum);
  }

  next() {
    if (!this.hasNext()) {
      return null;
    }

    this.current++;

    return this.lines[this.current].trim();
  }

  peek() {
    return this.lines[this.current + 1].trim();
  }

  hasNext() {
    return this.current + 1 !== this.lines.length;
  }
}

export class Stack<T> {
  private stack: T[] = [];

  push(item: T) {
    this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }
}
