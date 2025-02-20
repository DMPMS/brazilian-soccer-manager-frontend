import { TagProps } from 'antd';

import { PositionAreaEnum } from '../../../enums/PositionArea.enum';
import { TagStyled } from './positionTagProject.style';

interface PositionTagProjectProps extends TagProps {
  area?: PositionAreaEnum;
  primaryPosition?: boolean;
}

const PositionTagProject = ({ area, primaryPosition, ...props }: PositionTagProjectProps) => {
  let color: string;

  if (area === PositionAreaEnum.Attack) {
    color = '#f5222d';
  } else if (area === PositionAreaEnum.Midfield) {
    color = '#52c41a';
  } else if (area === PositionAreaEnum.Defense) {
    color = '#1890ff';
  } else if (area === PositionAreaEnum.Goalkeeper) {
    color = '#faad14';
  } else {
    color = 'default';
  }

  return <TagStyled color={color} primaryPosition={primaryPosition} {...props} />;
};

export default PositionTagProject;
