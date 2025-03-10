import { PLAYERGLOBAL_MAX_OVERALL, PLAYERGLOBAL_MIN_OVERALL } from '../constants/others';
import { MoraleEnum } from '../enums/Morale.enum';
import { MoraleRatingEnum } from '../enums/MoraleRating.enum';
import { PositionEnum } from '../enums/Position.enum';
import { PositionAreaEnum } from '../enums/PositionArea.enum';
import { PositionRatingEnum } from '../enums/PositionRating.enum';

const positionAreaByPositionId: { [key: number]: PositionAreaEnum } = {
  1: PositionAreaEnum.Attack,
  2: PositionAreaEnum.Attack,
  3: PositionAreaEnum.Attack,
  4: PositionAreaEnum.Attack,
  5: PositionAreaEnum.Midfield,
  6: PositionAreaEnum.Midfield,
  7: PositionAreaEnum.Midfield,
  8: PositionAreaEnum.Midfield,
  9: PositionAreaEnum.Midfield,
  10: PositionAreaEnum.Defense,
  11: PositionAreaEnum.Defense,
  12: PositionAreaEnum.Defense,
  13: PositionAreaEnum.Goalkeeper,
};

export const calculateOverallByPosition = (
  positionId: PositionEnum,
  playerOverall: number,
  primaryPositionIds: PositionEnum[],
  secondaryPositionIds: PositionEnum[],
): { overall: number | undefined; colorIndex: number } => {
  if (playerOverall < PLAYERGLOBAL_MIN_OVERALL || playerOverall > PLAYERGLOBAL_MAX_OVERALL) {
    return { overall: undefined, colorIndex: 5 };
  }

  let overall: number;
  let colorIndex: number;

  if (primaryPositionIds.includes(positionId)) {
    overall = playerOverall * PositionRatingEnum.Primary;
    colorIndex = 0;
  } else if (secondaryPositionIds.includes(positionId)) {
    overall = playerOverall * PositionRatingEnum.Secondary;
    colorIndex = 1;
  } else {
    const positionArea = positionAreaByPositionId[positionId];

    if (primaryPositionIds.some((id) => positionAreaByPositionId[id] === positionArea)) {
      overall = playerOverall * PositionRatingEnum.SameAreaPrimary;
      colorIndex = 2;
    } else if (secondaryPositionIds.some((id) => positionAreaByPositionId[id] === positionArea)) {
      overall = playerOverall * PositionRatingEnum.SameAreaSecondary;
      colorIndex = 3;
    } else if (positionId === PositionEnum.GK) {
      overall = playerOverall * PositionRatingEnum.NonPlayingGoalkeeper;
      colorIndex = 5;
    } else {
      overall = playerOverall * PositionRatingEnum.NonPlaying;
      colorIndex = 4;
    }
  }

  return { overall: Math.ceil(overall), colorIndex };
};

export const calculateOverallByMorale = (playerOverall: number, morale: MoraleEnum): number => {
  let overall: number;

  if (morale === MoraleEnum.VeryHigh) {
    overall = playerOverall * MoraleRatingEnum.VeryHigh;
  } else if (morale === MoraleEnum.High) {
    overall = playerOverall * MoraleRatingEnum.High;
  } else if (morale === MoraleEnum.Normal) {
    overall = playerOverall * MoraleRatingEnum.Normal;
  } else if (morale === MoraleEnum.Low) {
    overall = playerOverall * MoraleRatingEnum.Low;
  } else {
    overall = playerOverall * MoraleRatingEnum.VeryLow;
  }

  return Math.ceil(overall);
};
