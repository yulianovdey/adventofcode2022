import { Shape, Outcome, LetterToShape, Code, OutcomeToScore, ShapeToScore } from '../types';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d2/input.txt'), 'utf8').trim();

function calcOutcome(oppPlayed: Shape, youPlayed: Shape): Outcome {
  if (oppPlayed === youPlayed) {
    return Outcome.Draw;
  }

  switch (oppPlayed) {
    case Shape.Rock:
      return youPlayed === Shape.Paper ? Outcome.Win : Outcome.Loss;

    case Shape.Paper:
      return youPlayed === Shape.Scissors ? Outcome.Win : Outcome.Loss;

    case Shape.Scissors:
      return youPlayed === Shape.Rock ? Outcome.Win : Outcome.Loss;
  }
}

function calcRoundScore(oppPlayed: Code, youPlayed: Code): number {
  const oppShape = LetterToShape[oppPlayed];
  const yourShape = LetterToShape[youPlayed];

  const outcome = calcOutcome(oppShape, yourShape);

  return OutcomeToScore[outcome] + ShapeToScore[yourShape];
}

let totalScore = 0;
for (const line of lines.split('\n')) {
  const [oppPlayed, , youPlayed] = line.split('');

  totalScore += calcRoundScore(oppPlayed, youPlayed);
}

console.log(totalScore);
