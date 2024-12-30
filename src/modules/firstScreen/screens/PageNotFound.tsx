import { useNavigate } from 'react-router-dom';

import ButtonProject from '../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../shared/components/flex/FlexProject';
import { LimitedContainerCardProject } from '../../../shared/components/styles/limited.styled';
import { SignInRoutesEnum } from '../../shared/signIn/routes';
import { DescriptionNotFound, ImageNotFound, TitleNotFound } from '../styles/pageNotFound.styles';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(SignInRoutesEnum.SIGN_IN);
  };

  return (
    <FlexProject justify="center" align="center" style={{ height: '100vh' }}>
      <LimitedContainerCardProject width={300} margin="10px">
        <FlexProject justify="center" align="center" vertical style={{ textAlign: 'center' }}>
          <ImageNotFound src="/deflatedBall.png" />
          <TitleNotFound level={3}>Erro 404</TitleNotFound>
        </FlexProject>
        <DescriptionNotFound>Ops! Parece que essa página está fora de jogo.</DescriptionNotFound>
        <ButtonProject
          onClick={handleOnClickButton}
          type="primary"
          width="100%"
          margin="16px 0px 0px 0px"
        >
          Página de Login
        </ButtonProject>
      </LimitedContainerCardProject>
    </FlexProject>
  );
};

export default PageNotFound;
