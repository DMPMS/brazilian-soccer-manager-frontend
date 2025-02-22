import { MoraleEnum } from '../../../enums/Morale.enum';
import { MoraleRatingEnum } from '../../../enums/MoraleRating.enum';

interface OverallByMoraleProjectProps {
  morale: MoraleEnum;
  overall: number;
  margin?: string;
}

const OverallByMoraleProject = ({ morale, overall, margin }: OverallByMoraleProjectProps) => {
  let newMorale = 0;

  if (morale === MoraleEnum.VeryHigh) {
    newMorale = Math.ceil(overall * MoraleRatingEnum.VeryHigh);
  } else if (morale === MoraleEnum.High) {
    newMorale = Math.ceil(overall * MoraleRatingEnum.High);
  } else if (morale === MoraleEnum.Normal) {
    newMorale = Math.ceil(overall * MoraleRatingEnum.Normal);
  } else if (morale === MoraleEnum.Low) {
    newMorale = Math.ceil(overall * MoraleRatingEnum.Low);
  } else {
    newMorale = Math.ceil(overall * MoraleRatingEnum.VeryLow);
  }

  return <div style={{ margin: margin }}>{newMorale}</div>;
};

export default OverallByMoraleProject;
