import { inputToStacks, parseOpLines } from './common';

const stacks = inputToStacks();

for (const { n, from, to } of parseOpLines()) {
  const queue = [];
  for (let i = 0; i < n; i++) {
    queue.push(stacks[from].pop());
  }

  for (const item of queue.reverse()) {
    stacks[to].push(item);
  }
}

let crates = [];

for (const stack of Object.values(stacks)) {
  crates.push(stack.peak());
}

console.log(crates.join(''));
