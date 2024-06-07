import { Input, InputProps } from 'antd';

interface InputProjectProps extends InputProps {}

const InputProject = ({ ...props }: InputProjectProps) => {
  return <Input {...props} />;
};

export default InputProject;
