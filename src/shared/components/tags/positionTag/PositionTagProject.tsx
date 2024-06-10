import { TagProps } from 'antd';

import { TagStyled } from './positionTagProject.style';

interface PositionTagProjectProps extends TagProps {
  area?: string;
}

const PositionTagProject = ({ area, ...props }: PositionTagProjectProps) => {
  let color: string;

  if (area === 'Ataque') {
    color = '#f5222d';
  } else if (area === 'Meio-Campo') {
    color = '#52c41a';
  } else if (area === 'Defesa') {
    color = '#1890ff';
  } else if (area === 'Goleiro') {
    color = '#faad14';
  } else {
    color = 'default';
  }

  return <TagStyled color={color} {...props} />;
};

export default PositionTagProject;
