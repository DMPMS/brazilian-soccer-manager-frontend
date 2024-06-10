import { FolderOpenOutlined } from '@ant-design/icons';
import { Upload as UploadAntd, UploadProps as UploadPropsAntd } from 'antd';

import ButtonProject from '../../buttons/button/ButtonProject';

// Refactory later.
const UploadImage = ({ children, ...props }: UploadPropsAntd) => {
  return (
    <UploadAntd listType="picture" maxCount={1} {...props}>
      <ButtonProject icon={<FolderOpenOutlined />}>{children}</ButtonProject>
    </UploadAntd>
  );
};

export default UploadImage;
