import { RotatingBallIcon } from './loadingProject.style';

interface LoadingProjectProps {
  width: number;
  height: number;
}

const LoadingProject = ({ width, height }: LoadingProjectProps) => {
  return <RotatingBallIcon width={width} height={height} />;
};

export default LoadingProject;
