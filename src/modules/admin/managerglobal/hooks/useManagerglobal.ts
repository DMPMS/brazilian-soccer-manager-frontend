import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_MANAGERGLOBAL, URL_MANAGERGLOBAL_ID } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { ManagerglobalType } from '../../../../shared/types/Managerglobal.type';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { ManagerglobalRoutesEnum } from '../routes';

export const useManagerglobal = () => {
  const { managersglobal, setManagersglobal } = useManagerglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [managerglobalIdDelete, setManagerglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const managersglobalFiltered = managersglobal.filter((managerglobal) =>
    managerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!managersglobal || managersglobal.length === 0) {
      newRequest(MethodsEnum.GET, URL_MANAGERGLOBAL).then((data: ManagerglobalType[]) => {
        setManagersglobal(data);
      });
    }
  }, []);

  const handleOnInsert = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT);
  };

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnEdit = (managerglobalId: number) => {
    navigate(
      ManagerglobalRoutesEnum.MANAGERGLOBAL_EDIT.replace(':managerglobalId', `${managerglobalId}`),
    );
  };

  const handleOnDelete = async () => {
    await newRequest(
      MethodsEnum.DELETE,
      URL_MANAGERGLOBAL_ID.replace('{managerglobalId}', `${managerglobalIdDelete}`),
    );

    await newRequest(MethodsEnum.GET, URL_MANAGERGLOBAL).then((data: ManagerglobalType[]) => {
      setManagersglobal(data);
    });

    setManagerglobalIdDelete(undefined);

    setNotification('Treinador excluído.', 'success');
  };

  const handleOnCloseModalDelete = () => {
    setManagerglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (managerglobalId: number) => {
    setManagerglobalIdDelete(managerglobalId);
  };

  return {
    loading,
    managersglobal: managersglobalFiltered,
    handleOnInsert,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!managerglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
