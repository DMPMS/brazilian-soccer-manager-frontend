import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import FlexProject from '../../../shared/components/flex/FlexProject';
import { LimitedContainerCard } from '../../../shared/components/styles/limited.styled';
import { LoginRoutesEnum } from '../../login/routes';
import { DescriptionNotFound, ImageNotFound, TitleNotFound } from '../styles/pageNotFound.styles';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCard width={300} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <ImageNotFound src="../../../../public/deflatedBall.png" />
          <TitleNotFound level={3}>Erro 404</TitleNotFound>
        </FlexProject>
        <DescriptionNotFound>Ops! Parece que essa página está fora de jogo.</DescriptionNotFound>
        <Button onClick={handleOnClickButton} type="primary" margin="16px 0px 0px 0px">
          Página de Login
        </Button>
      </LimitedContainerCard>
    </FlexProject>
  );
};

export default PageNotFound;
