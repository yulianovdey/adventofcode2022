import { Shape, Outcome, OutcomeToScore, LetterToShape, ShapeToScore, LetterToOutcome, Code, OutcomeCode } from '../types';
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

  return (Object.keys(winConditions) as Shape[])
    .find((k) => winConditions[k as Shape] === oppPlayed)!;
}

function calcRoundScore(oppPlayed: Code, desiredOutcomeCode: OutcomeCode): number {
  const oppShape = LetterToShape[oppPlayed];
  const desiredOutcome = LetterToOutcome[desiredOutcomeCode];

  const yourShape = calcShape(oppShape, desiredOutcome);

  return ShapeToScore[yourShape] + OutcomeToScore[desiredOutcome];
}

let totalScore = 0;
for (const line of lines.split('\n')) {
  const [oppPlayed, , desiredOutcome] = line.split('');

  totalScore += calcRoundScore(oppPlayed as Code, desiredOutcome as OutcomeCode);
}

console.log(totalScore);
