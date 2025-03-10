import { StaminaBar, StaminaContainer } from './staminaBarProject.style';

interface StaminaBarProjectProps {
  stamina: number;
}

const StaminaBarProject = ({ stamina }: StaminaBarProjectProps) => {
  let color: string;

  if (stamina === 100) {
    color = '#1890ff';
  } else if (stamina >= 80) {
    color = '#008000';
  } else if (stamina >= 60) {
    color = '#9acd32';
  } else if (stamina >= 40) {
    color = '#e8d707';
  } else if (stamina >= 20) {
    color = '#ffa500';
  } else {
    color = '#ff0000';
  }

  return (
    <StaminaContainer>
      <StaminaBar width={stamina} backgroundColor={color} />
    </StaminaContainer>
  );
};

export default StaminaBarProject;
