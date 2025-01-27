import { MoraleEnum } from '../../../enums/Morale.enum';
import HighMoraleSVGProject from '../../svg/HighMoraleSVGProject';
import LowMoraleSVGProject from '../../svg/LowMoraleSVGProject';
import NormalMoraleSVGProject from '../../svg/NormalMoraleSVGProject';
import VeryHighMoraleSVGProject from '../../svg/VeryHighMoraleSVGProject';
import VeryLowMoraleSVGProject from '../../svg/VeryLowMoraleSVGProject';

interface MoraleIconProjectProps {
  morale: MoraleEnum;
  width: number;
  height: number;
}

const MoraleIconProject = ({ morale, width, height }: MoraleIconProjectProps) => {
  if (morale === MoraleEnum.VeryHigh) {
    return <VeryHighMoraleSVGProject width={width} height={height} />;
  } else if (morale === MoraleEnum.High) {
    return <HighMoraleSVGProject width={width} height={height} />;
  } else if (morale === MoraleEnum.Normal) {
    return <NormalMoraleSVGProject width={width} height={height} />;
  } else if (morale === MoraleEnum.Low) {
    return <LowMoraleSVGProject width={width} height={height} />;
  } else {
    return <VeryLowMoraleSVGProject width={width} height={height} />;
  }
};

export default MoraleIconProject;
