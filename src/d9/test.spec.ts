import assert from 'node:assert/strict';
import { Visitor, updateTail } from './common';
import { updateAll } from './p2';

function draw(nRows, nCols, rope) {
  const grid = [];
  for (let i = 0; i < nRows; i++) {
    grid.push('.'.repeat(nCols).split(''));
  }

  rope.forEach((v, index) => {
    const [x, y] = v.position;

    const row = grid.length - 1 - y;
    const col = x;

    if (grid[row][col] === '.') {
      grid[row][col] = index === 0 ? 'H' : index.toString();
    }
  });

  grid.forEach((row) => {
    // console.log(row.join(' '));
  });

  return grid;
}

describe('Visitor', () => {
  it('should update coordinates', () => {
    const h = new Visitor();

    h.moveX(2);
    h.moveX(-2);
    h.moveY(5);
    h.moveY(2);
    h.moveY(-3);

    assert.equal(h.x, 0);
    assert.equal(h.y, 4);
  });
});

describe('updateTail', () => {
  it('should not update when in same position', () => {
    const h = new Visitor();
    const t = new Visitor();

    h.moveX(1, updateTail.bind(undefined, t));
    t.moveX(1);
    h.moveX(0, updateTail.bind(undefined, t));

    assert.equal(t.x, 1);
    assert.equal(t.y, 0);
  });

  it('should not update when touching horizontally', () => {
    const h = new Visitor();
    const t = new Visitor();

    h.moveX(1, updateTail.bind(undefined, t));

    assert.equal(t.x, 0);
    assert.equal(t.y, 0);
  });

  it('should not update when touching diagonally', () => {
    const h = new Visitor();
    const t = new Visitor();

    h.moveY(1, updateTail.bind(undefined, t));
    h.moveX(1, updateTail.bind(undefined, t));

    assert.equal(t.x, 0);
    assert.equal(t.y, 0);
  });

  it('should update when not touching', () => {
    const h = new Visitor();
    const t = new Visitor();

    h.moveX(3, updateTail.bind(undefined, t));

    assert.equal(t.x, 2);
    assert.equal(t.y, 0);
  });

  it('should update when not touching diagonally', () => {
    const h = new Visitor();
    const t = new Visitor();

    h.moveX(-1, updateTail.bind(undefined, t));
    h.moveY(1, updateTail.bind(undefined, t));
    h.moveX(-1, updateTail.bind(undefined, t));

    assert.equal(t.x, -1);
    assert.equal(t.y, 1);

    h.moveX(1, updateTail.bind(undefined, t));
    h.moveY(1, updateTail.bind(undefined, t));
    h.moveX(2, updateTail.bind(undefined, t));

    assert.equal(t.x, 0);
    assert.equal(t.y, 2);

    h.moveY(2, updateTail.bind(undefined, t));

    assert.equal(t.x, 1);
    assert.equal(t.y, 3);

    h.moveY(-2, updateTail.bind(undefined, t));
    h.moveX(1, updateTail.bind(undefined, t));
    h.moveY(-1, updateTail.bind(undefined, t));

    assert.equal(t.x, 2);
    assert.equal(t.y, 2);
  });
});

describe('updateAll', () => {
  it('should solve the first example correctly', () => {
    const rope = new Array(10).fill(undefined).map(() => new Visitor());
    const h = rope[0];

    const visits = {'0:0': 1};
    const update = (x, y) => {
      updateAll(rope, x, y);
      visits[rope[rope.length - 1]?.position.join(':')] = 1;
    };

    [
      ['x', 4],
      ['y', 4],
      ['x', -3],
      ['y', -1],
      ['x', 4],
      ['y', -1],
      ['x', -5],
      ['x', 2],
    ].forEach(([axis, steps]) => {
      h.move(axis, steps, update);
    });

    const expected = [
      ['.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.'],
      ['.', '1', 'H', '3', '.', '.'],
      ['.', '5', '.', '.', '.', '.'],
      ['6', '.', '.', '.', '.', '.'],
    ];

    assert.deepEqual(draw(5, 6, rope), expected);

    console.log(Object.keys(visits).length);
  });

  it('should solve the second example correctly', () => {
    const rope = new Array(10).fill(undefined).map(() => {
      const v = new Visitor();
      v.x = 11;
      v.y = 5;
      return v;
    });
    const h = rope[0];

    const visits = {'11:5': 1};
    const update = (x, y) => {
      updateAll(rope, x, y);
      visits[rope[rope.length - 1]?.position.join(':')] = 1;
    };

    [
      ['x', 5],
      ['y', 8],
      ['x', -8],
      ['y', -3],
      ['x', 17],
      ['y', -10],
      ['x', -25],
      ['y', 20],
    ].forEach(([axis, steps]) => {
      h.move(axis, steps, update);
    });

    const expected = new Array(21).fill(undefined).map(() => {
      return '.'.repeat(26).split('');
    });
    for (let i = 0; i < 10; i++) {
      expected[i][0] = i === 0 ? 'H' : i.toString();
    }

    assert.deepEqual(draw(21, 26, rope), expected);
    assert.equal(Object.keys(visits).length, 36);
  });
});
