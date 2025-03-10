import { TextStyled } from './overallProject.style';

interface OverallProjectProps {
  overall: number;
  margin?: string;
}

const OverallProject = ({ overall, margin }: OverallProjectProps) => {
  let color: string;

  if (overall >= 90) {
    color = '#1890ff';
  } else if (overall >= 80) {
    color = '#008000';
  } else if (overall >= 70) {
    color = '#9acd32';
  } else if (overall >= 60) {
    color = '#e8d707';
  } else if (overall >= 50) {
    color = '#ffa500';
  } else {
    color = '#ff0000';
  }

  return (
    <TextStyled color={color} margin={margin}>
      {overall}
    </TextStyled>
  );
};

export default OverallProject;
