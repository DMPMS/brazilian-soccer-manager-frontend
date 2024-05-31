import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PLAYERGLOBAL, URL_PLAYERGLOBAL_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { usePlayerglobalReducer } from '../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { PlayerglobalRoutesEnum } from '../routes';

export const usePlayerglobal = () => {
  const { playersglobal, setPlayersglobal } = usePlayerglobalReducer();

  const { request } = useRequests();
  const navigate = useNavigate();

  const [playerglobalIdDelete, setPlayerglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const playersglobalFiltered = playersglobal.filter((playerglobal) =>
    playerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!playersglobal || playersglobal.length === 0) {
      request(URL_PLAYERGLOBAL, MethodsEnum.GET, setPlayersglobal);
    }
  }, []);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnEdit = (playerglobalId: number) => {
    navigate(
      PlayerglobalRoutesEnum.PLAYERGLOBAL_EDIT.replace(':playerglobalId', `${playerglobalId}`),
    );
  };

  const handleOnDelete = async () => {
    await request(
      URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', `${playerglobalIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Jogador excluído com sucesso!',
    );

    await request(URL_PLAYERGLOBAL, MethodsEnum.GET, setPlayersglobal);

    setPlayerglobalIdDelete(undefined);
  };

  const handleOnCloseModalDelete = () => {
    setPlayerglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (playerglobalId: number) => {
    setPlayerglobalIdDelete(playerglobalId);
  };

  return {
    playersglobal: playersglobalFiltered,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!playerglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
