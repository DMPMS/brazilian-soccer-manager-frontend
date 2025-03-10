import { MoraleEnum } from '../../../enums/Morale.enum';
import { calculateOverallByMorale } from '../../../functions/calculateOverall';
import OverallProject from '../overall/OverallProject';

interface OverallByMoraleProjectProps {
  morale: MoraleEnum;
  overall: number;
  margin?: string;
}

const OverallByMoraleProject = ({ morale, overall, margin }: OverallByMoraleProjectProps) => {
  return <OverallProject overall={calculateOverallByMorale(overall, morale)} margin={margin} />;
};

export default OverallByMoraleProject;
