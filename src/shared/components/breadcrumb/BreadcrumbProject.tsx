import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProjectProps {
  listBreadcrumb: ListBreadcrumb[];
}

const BreadcrumbProject = ({ listBreadcrumb }: BreadcrumbProjectProps) => {
  const navigate = useNavigate();

  const handleGoToClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <Breadcrumb>
      {listBreadcrumb.map((breadcrumb, index) => (
        <Breadcrumb.Item key={`breadcrumb_${index}`}>
          {breadcrumb.navigateTo ? (
            <a onClick={() => handleGoToClick(breadcrumb.navigateTo || '')}>{breadcrumb.name}</a>
          ) : (
            breadcrumb.name
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbProject;
