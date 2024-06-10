import { Spin, SpinProps } from 'antd';

const LoadingProject = ({ ...props }: SpinProps) => {
  return <Spin {...props} />;
};

export default LoadingProject;
