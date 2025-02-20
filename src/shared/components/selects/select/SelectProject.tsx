import { Select, SelectProps } from 'antd';

export interface SelectProjectProps extends SelectProps {}

const SelectProject = ({ ...props }: SelectProjectProps) => {
  return <Select {...props} />;
};

export default SelectProject;
