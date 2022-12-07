import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Stack } from '../util';

export const STACK_INDICES_LINE = 8;

export const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d5/input.txt'), 'utf8').split('\n');

function linesToMatrix(lines: string[]): string[][] {
  const matrix = [];

  for (const line of lines) {
    matrix.push(line.split(''));
  }

  return matrix;
}

export function inputToStacks(): { [k: number]: Stack<string>} {
  const stackMatrix = linesToMatrix(lines.slice(0, STACK_INDICES_LINE));
  const stacks = {};

  const stackIndicesLine = lines[STACK_INDICES_LINE]!;

  function createStackForColumn(column: number) {
    const stack = new Stack();
    for (let line = stackMatrix.length - 1; line >= 0; line--) {
      if (stackMatrix[line]![column]?.trim()) {
        stack.push(stackMatrix[line]![column] as string);
      }
    }
    return stack;
  }

  for (const [column, index] of stackIndicesLine.split('').entries()) {
    if (!index.trim()) continue;

    const stack = createStackForColumn(column);

    stacks[parseInt(index)] = stack;
  }

  return stacks;
}

export function parseOpLines() {
  const opLines = lines.slice(STACK_INDICES_LINE + 2);
  const ops = [];

  for (const op of opLines) {
    if (!op.trim()) continue;

    const [, n, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(op);

    ops.push({ n, from, to });
  }

  return ops;
}
