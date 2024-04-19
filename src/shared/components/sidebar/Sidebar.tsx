import { ContainerLogoName, LogoSidebar, NameCompany } from './sidebar.style';
import { ContainerSidebar } from './sidebar.style';

const Sidebar = () => {
  return (
    <ContainerSidebar>
      <ContainerLogoName>
        <LogoSidebar src="./logo.png" />
        <NameCompany>BSM</NameCompany>
      </ContainerLogoName>
    </ContainerSidebar>
  );
};

export default Sidebar;
