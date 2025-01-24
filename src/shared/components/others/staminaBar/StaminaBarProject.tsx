import { StaminaBar, StaminaContainer } from './staminaBarProject.style';

interface StaminaBarProjectProps {
  stamina: number;
}

const StaminaBarProject = ({ stamina }: StaminaBarProjectProps) => {
  let color: string;

  if (stamina <= 20) {
    color = '#ff0000';
  } else if (stamina <= 40) {
    color = '#ffa500';
  } else if (stamina <= 60) {
    color = '#ffec00';
  } else if (stamina <= 80) {
    color = '#9acd32';
  } else if (stamina < 100) {
    color = '#008000';
  } else {
    color = '#1890ff';
  }

  return (
    <StaminaContainer>
      <StaminaBar width={stamina} backgroundColor={color} />
    </StaminaContainer>
  );
};

export default StaminaBarProject;
