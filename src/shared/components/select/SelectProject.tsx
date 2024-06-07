import { Select, SelectProps } from 'antd';

interface SelectProjectProps extends SelectProps {}

const SelectProject = ({ ...props }: SelectProjectProps) => {
  return <Select {...props} />;
};

export default SelectProject;
