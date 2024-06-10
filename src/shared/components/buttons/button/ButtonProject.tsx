import { ButtonProps } from 'antd';

import { ButtonStyled } from './buttonProject.style';

interface ButtonProjectProps extends ButtonProps {
  margin?: string;
}

const ButtonProject = ({ margin, ...props }: ButtonProjectProps) => {
  return <ButtonStyled style={{ margin: margin }} {...props} />;
};

export default ButtonProject;
