import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_ID,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { ManagerglobalRoutesEnum } from '../routes';

export const useManagerglobal = () => {
  const {
    managersglobal,
    managersglobalWithoutTeamglobal,
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
  } = useManagerglobalReducer();

  const { request } = useRequests();
  const navigate = useNavigate();

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

  const handleOnEdit = (managerglobalId: number) => {
    navigate(
      ManagerglobalRoutesEnum.MANAGERGLOBAL_EDIT.replace(':managerglobalId', `${managerglobalId}`),
    );
  };

  const handleOnDelete = async () => {
    await request(
      URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', `${managerglobalIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Treinador excluído com sucesso!',
    );

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

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
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!managerglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
