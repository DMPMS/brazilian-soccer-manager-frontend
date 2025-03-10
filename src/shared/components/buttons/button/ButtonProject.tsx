import { ButtonProps } from 'antd';

import { ButtonStyled } from './buttonProject.style';

interface ButtonProjectProps extends ButtonProps {
  margin?: string;
  width?: string;
}

const ButtonProject = ({ margin, width, ...props }: ButtonProjectProps) => {
  return <ButtonStyled margin={margin} width={width} {...props} />;
};

export default ButtonProject;
