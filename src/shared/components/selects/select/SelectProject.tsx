import { SelectProps } from 'antd';

import { SelectStyled } from './selectProject.style';

export interface SelectProjectProps extends SelectProps {}

const SelectProject = ({ ...props }: SelectProjectProps) => {
  return <SelectStyled {...props} />;
};

export default SelectProject;
