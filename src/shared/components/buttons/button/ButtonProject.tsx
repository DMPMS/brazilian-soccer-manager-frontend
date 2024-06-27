import { Button, ButtonProps } from 'antd';

interface ButtonProjectProps extends ButtonProps {
  margin?: string;
  width?: string;
}

const ButtonProject = ({ margin, width, ...props }: ButtonProjectProps) => {
  return <Button style={{ margin: margin, width: width }} {...props} />;
};

export default ButtonProject;
