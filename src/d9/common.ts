export class Visitor {
  constructor(public x = 0, public y = 0) {
  }

  get position() {
    return [this.x, this.y];
  }

  move(axis, steps, callback?) {
    let initial = this[axis];
    while (steps > 0 ? this[axis] < initial + steps : this[axis] > initial + steps) {
      const change = steps < 0 ? -1 : 1;
      this[axis] += change;
      callback?.(this.x, this.y);
    }
  }

  moveX(steps, callback?) {
    this.move('x', steps, callback);
  }

  moveY(steps, callback?) {
    this.move('y', steps, callback);
  }
}

export function updateTail(t, x, y) {
  const position = {'x': x, 'y': y};
  const distanceX = Math.abs(x - t.x);
  const distanceY = Math.abs(y - t.y);
  const distance = distanceX + distanceY;

  if (distance <= 1) {
    return;
  }

  if (distance === 2 && x !== t.x && y !== t.y) {
    return;
  }

  if (t.x === x) {
    t.y = (y > t.y ? y - 1 : y + 1);
    return;
  }

  if (t.y === y) {
    t.x = (x > t.x ? x - 1 : x + 1);
    return;
  }

  if (distanceX !== distanceY) {
    const shortest = distanceX < distanceY ? 'x' : 'y';
    const longest = shortest === 'x' ? 'y' : 'x';
    t[shortest] = position[shortest];
    t[longest] = t[longest] > position[longest] ? position[longest] + 1 : position[longest] - 1;
  } else {
    t.x = (x > t.x ? x - 1 : x + 1);
    t.y = (y > t.y ? y - 1 : y + 1);
  }
}
