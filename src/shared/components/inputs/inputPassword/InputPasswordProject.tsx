import { Input } from 'antd';

import { InputProjectProps } from '../input/InputProject';

interface InputPasswordProjectProps extends InputProjectProps {}

const InputPasswordProject = ({ ...props }: InputPasswordProjectProps) => {
  return <Input.Password {...props} />;
};

export default InputPasswordProject;
