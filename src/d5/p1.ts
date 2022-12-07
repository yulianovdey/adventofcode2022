import { inputToStacks, parseOpLines } from './common';

const stacks = inputToStacks();

for (const { n, from, to } of parseOpLines()) {
  for (let i = 0; i < n; i++) {
    stacks[to].push(stacks[from].pop());
  }
}

let crates = [];

for (const stack of Object.values(stacks)) {
  crates.push(stack.peek());
}

console.log(crates.join(''));
