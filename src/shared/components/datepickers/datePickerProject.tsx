import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

import { DATE_FORMAT } from '../../constants/others';

interface DatePickerProjectProps extends DatePickerProps {}

const DatePickerProject = ({ ...props }: DatePickerProjectProps) => {
  return (
    <ConfigProvider locale={ptBR}>
      <DatePicker
        format={{
          format: DATE_FORMAT,
          type: 'mask',
        }}
        {...props}
        style={{ width: '100%' }}
      />
    </ConfigProvider>
  );
};

export default DatePickerProject;
