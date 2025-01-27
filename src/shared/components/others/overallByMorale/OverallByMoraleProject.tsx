import {
  PLAYERSAVE_HIGH_MORALE_RATING,
  PLAYERSAVE_LOW_MORALE_RATING,
  PLAYERSAVE_NORMAL_MORALE_RATING,
  PLAYERSAVE_VERY_HIGH_MORALE_RATING,
  PLAYERSAVE_VERY_LOW_MORALE_RATING,
} from '../../../constants/others';
import { MoraleEnum } from '../../../enums/Morale.enum';

interface OverallByMoraleProjectProps {
  morale: MoraleEnum;
  overall: number;
  margin?: string;
}

const OverallByMoraleProject = ({ morale, overall, margin }: OverallByMoraleProjectProps) => {
  let newMorale = 0;

  if (morale === MoraleEnum.VeryHigh) {
    newMorale = Math.ceil(overall * PLAYERSAVE_VERY_HIGH_MORALE_RATING);
  } else if (morale === MoraleEnum.High) {
    newMorale = Math.ceil(overall * PLAYERSAVE_HIGH_MORALE_RATING);
  } else if (morale === MoraleEnum.Normal) {
    newMorale = Math.ceil(overall * PLAYERSAVE_NORMAL_MORALE_RATING);
  } else if (morale === MoraleEnum.Low) {
    newMorale = Math.ceil(overall * PLAYERSAVE_LOW_MORALE_RATING);
  } else {
    newMorale = Math.ceil(overall * PLAYERSAVE_VERY_LOW_MORALE_RATING);
  }

  return <div style={{ margin: margin }}>{newMorale}</div>;
};

export default OverallByMoraleProject;
