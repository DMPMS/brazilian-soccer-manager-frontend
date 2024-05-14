import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import { LoginRoutesEnum } from '../../login/routes';
import {
  ContainerError,
  ContainerPageNotFound,
  DeflatedBallImage,
  DescriptionError,
  TitleError,
} from '../styles/pageNotFound.styles';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };
  return (
    <ContainerPageNotFound>
      <ContainerError>
        <DeflatedBallImage src="../../../../public/deflatedBall.png" />
        <TitleError level={3}>Erro 404</TitleError>
        <DescriptionError>Ops! Parece que essa página está fora de jogo.</DescriptionError>
        <Button onClick={handleOnClickButton} margin="32px 0px 0px 0px" type="primary">
          Página de Login
        </Button>
      </ContainerError>
    </ContainerPageNotFound>
  );
};

export default PageNotFound;
