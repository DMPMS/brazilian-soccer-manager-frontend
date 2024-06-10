import { useNavigate } from 'react-router-dom';

import ButtonProject from '../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../shared/components/flex/FlexProject';
import { LimitedContainerProjectCardProject } from '../../../shared/components/styles/limited.styled';
import { LoginRoutesEnum } from '../../login/routes';
import { DescriptionNotFound, ImageNotFound, TitleNotFound } from '../styles/pageNotFound.styles';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerProjectCardProject width={300} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <ImageNotFound src="../../../../public/deflatedBall.png" />
          <TitleNotFound level={3}>Erro 404</TitleNotFound>
        </FlexProject>
        <DescriptionNotFound>Ops! Parece que essa página está fora de jogo.</DescriptionNotFound>
        <ButtonProject onClick={handleOnClickButton} type="primary" margin="16px 0px 0px 0px">
          Página de Login
        </ButtonProject>
      </LimitedContainerProjectCardProject>
    </FlexProject>
  );
};

export default PageNotFound;
