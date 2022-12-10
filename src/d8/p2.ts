import { parseLines, linesToMatrix } from '../util';

const grid = linesToMatrix(parseLines(8));

function score(row, col) {
  const height = grid[row][col];

  let right = 0;
  for (let i = col + 1; i < grid[row].length; i++) {
    right++;
    if (grid[row][i] >= height) {
      break;
    }
  }

  let left = 0;
  for (let i = col - 1; i >= 0; i--) {
    left++;
    if (grid[row][i] >= height) {
      break;
    }
  }

  let up = 0;
  for (let i = row - 1; i >= 0; i--) {
    up++
    if (grid[i][col] >= height) {
      break;
    }
  }

  let down = 0;
  for (let i = row + 1; i < grid[col].length; i++) {
    down++;
    if (grid[i][col] >= height) {
      break;
    }
  }

  return right * left * up * down;
}


let max = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    grid[i][j] = parseInt(grid[i][j]);

    max = Math.max(max, score(i, j));
  }
}

console.log(max);
