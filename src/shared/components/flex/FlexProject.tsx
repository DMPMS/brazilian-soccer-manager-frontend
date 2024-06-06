import { Flex, FlexProps } from 'antd';

interface FlexProjectProps extends FlexProps {
  children: React.ReactNode;
  margin?: string;
}

const FlexProject = ({ children, margin, ...props }: FlexProjectProps) => {
  return (
    <Flex style={{ margin: margin }} {...props}>
      {children}
    </Flex>
  );
};

export default FlexProject;
