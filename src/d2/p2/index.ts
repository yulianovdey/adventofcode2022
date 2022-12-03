import { Shape, Outcome, OutcomeToScore, LetterToShape, ShapeToScore, LetterToOutcome, Code } from '../types';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const lines = readFileSync(resolve(process.env['PWD'] as string, 'src/d2/input.txt'), 'utf8').trim();

function calcShape(oppPlayed: Shape, desiredOutcome: Outcome): Shape {
  if (desiredOutcome === Outcome.Draw) {
    return oppPlayed;
  }

  const winConditions = {
    [Shape.Rock]: Shape.Paper,
    [Shape.Paper]: Shape.Scissors,
    [Shape.Scissors]: Shape.Rock,
  };

  if (desiredOutcome === Outcome.Win) {
    return winConditions[oppPlayed];
  }

  return Object.keys(winConditions).find((k: Shape) => winConditions[k] === oppPlayed);
}

function calcRoundScore(oppPlayed: Code, desiredOutcomeCode: Code): number {
  const oppShape = LetterToShape[oppPlayed];
  const desiredOutcome = LetterToOutcome[desiredOutcomeCode];

  const yourShape = calcShape(oppShape, desiredOutcome);

  return ShapeToScore[yourShape] + OutcomeToScore[desiredOutcome];
}

let totalScore = 0;
for (const line of lines.split('\n')) {
  const [oppPlayed, , desiredOutcome] = line.split('');

  totalScore += calcRoundScore(oppPlayed, desiredOutcome);
}

console.log(totalScore);
