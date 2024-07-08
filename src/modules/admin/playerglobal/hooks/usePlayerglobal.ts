import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PLAYERGLOBAL, URL_PLAYERGLOBAL_ID } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { usePlayerglobalReducer } from '../../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { PlayerglobalRoutesEnum } from '../routes';

export const usePlayerglobal = () => {
  const { playersglobal, setPlayersglobal } = usePlayerglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [playerglobalIdDelete, setPlayerglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const playersglobalFiltered = playersglobal.filter((playerglobal) =>
    playerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!playersglobal || playersglobal.length === 0) {
      newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL).then((data) => {
        setPlayersglobal(data);
      });
    }
  }, []);

  const handleOnClickInsert = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL_INSERT);
  };

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnEdit = (playerglobalId: number) => {
    navigate(
      PlayerglobalRoutesEnum.PLAYERGLOBAL_EDIT.replace(':playerglobalId', `${playerglobalId}`),
    );
  };

  const handleOnDelete = async () => {
    await newRequest(
      MethodsEnum.DELETE,
      URL_PLAYERGLOBAL_ID.replace('{playerglobalId}', `${playerglobalIdDelete}`),
    );

    await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL).then((data) => {
      setPlayersglobal(data);
    });

    setPlayerglobalIdDelete(undefined);

    setNotification('Jogador excluído.', 'success');
  };

  const handleOnCloseModalDelete = () => {
    setPlayerglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (playerglobalId: number) => {
    setPlayerglobalIdDelete(playerglobalId);
  };

  return {
    loading,
    playersglobal: playersglobalFiltered,
    handleOnClickInsert,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!playerglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
