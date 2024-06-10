/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from 'antd';

function TableProject<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <Table bordered={true} style={{ borderRadius: 10 }} {...props} />;
}

export default TableProject;
