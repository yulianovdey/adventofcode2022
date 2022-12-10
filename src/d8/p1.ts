import { parseLines, linesToMatrix } from '../util';

const grid = linesToMatrix(parseLines(8));

const visible = {};

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (i === 0 || j === grid[i].length - 1) {
      visible[`${i}:${j}`] = true;
      visible[`${j}:${i}`] = true;
    }
    grid[i][j] = parseInt(grid[i][j]);
  }
}

for (let i = 0; i < grid.length; i++) {
  let rMin = 0;
  let cMin = 0;
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] > rMin) {
      visible[`${i}:${j}`] = true;
      rMin = grid[i][j];
    }

    if (grid[j][i] > cMin) {
      visible[`${j}:${i}`] = true;
      cMin = grid[j][i];
    }
  }
}

for (let i = grid.length - 1; i >= 0; i--) {
  let rMin = 0;
  let cMin = 0;
  for (let j = grid[i].length - 1; j >= 0; j--) {
    if (grid[i][j] > rMin) {
      visible[`${i}:${j}`] = true;
      rMin = grid[i][j];
    }

    if (grid[j][i] > cMin) {
      visible[`${j}:${i}`] = true;
      cMin = grid[j][i];
    }
  }
}

console.log(Object.keys(visible).length);
