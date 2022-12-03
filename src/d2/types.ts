export enum Shape {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors',
}

export enum Code {
  A = 'A',
  B = 'B',
  C = 'C',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export const LetterToShape: { [c in Code]: Shape } = {
  [Code.A]: Shape.Rock,
  [Code.B]: Shape.Paper,
  [Code.C]: Shape.Scissors,
  [Code.X]: Shape.Rock,
  [Code.Y]: Shape.Paper,
  [Code.Z]: Shape.Scissors,
};

export const ShapeToScore: { [k in Shape]: number } = {
  [Shape.Rock]: 1,
  [Shape.Paper]: 2,
  [Shape.Scissors]: 3,
};

export enum Outcome {
  Loss = 'Loss',
  Draw = 'Draw',
  Win = 'Win',
}

export const OutcomeToScore = {
  [Outcome.Loss]: 0,
  [Outcome.Draw]: 3,
  [Outcome.Win]: 6,
};
