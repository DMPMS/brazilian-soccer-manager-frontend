import { FolderOpenOutlined } from '@ant-design/icons';
import { Upload as UploadAntd, UploadProps as UploadPropsAntd } from 'antd';

import Button from '../../buttons/button/Button';

const UploadImage = ({ children, ...props }: UploadPropsAntd) => {
  return (
    <UploadAntd listType="picture" maxCount={1} {...props}>
      <Button icon={<FolderOpenOutlined />}>{children}</Button>
    </UploadAntd>
  );
};

export default UploadImage;
