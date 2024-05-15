import { useEffect, useState } from 'react';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_ID,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';

export const useManagerglobal = () => {
  const {
    managersglobal,
    managersglobalWithoutTeamglobal,
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
  } = useManagerglobalReducer();
  const { request } = useRequests();
  const { setNotification } = useGlobalReducer();

  const [managerglobalIdDelete, setManagerglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const managersglobalFiltered = managersglobal.filter((managerglobal) =>
    managerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!managersglobal || managersglobal.length === 0) {
      request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    }
  }, []);

  useEffect(() => {
    if (!managersglobalWithoutTeamglobal || managersglobalWithoutTeamglobal.length === 0) {
      request(
        URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
        MethodsEnum.GET,
        setManagersglobalWithoutTeamglobal,
      );
    }
  }, []);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnDelete = async () => {
    await request(
      URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', `${managerglobalIdDelete}`),
      MethodsEnum.DELETE,
    ).then(() => {
      setNotification('Sucesso!', 'success', 'Treinador excluído com sucesso!');
    });

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    setManagerglobalIdDelete(undefined);
  };

  const handleOnCloseModalDelete = () => {
    setManagerglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (managerglobalId: number) => {
    setManagerglobalIdDelete(managerglobalId);
  };

  return {
    managersglobal: managersglobalFiltered,
    managersglobalWithoutTeamglobal,
    handleOnSearch,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!managerglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
