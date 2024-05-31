import { TagProps as TagAntdProps } from 'antd';

import { TagAntd } from './positionTag.style';

interface TagProps extends TagAntdProps {
  area?: string;
}

const PositionTag = ({ area, ...props }: TagProps) => {
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

  return <TagAntd color={color} {...props} />;
};

export default PositionTag;
