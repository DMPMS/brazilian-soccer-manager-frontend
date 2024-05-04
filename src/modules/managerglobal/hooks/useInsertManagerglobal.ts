import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { InsertManagerglobalDto } from '../../../shared/dtos/InsertManagerglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { ManagerglobalRoutesEnum } from '../routes';

export const useInsertManagerglobal = () => {
  const navigate = useNavigate();

  const { request } = useRequests();
  const { setManagersglobal, setManagersglobalWithoutTeamglobal } = useManagerglobalReducer();
  const { setNotification } = useGlobalReducer();

  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [managerglobal, setManagerglobal] = useState<InsertManagerglobalDto>({
    name: '',
    age: 0,
  });

  useEffect(() => {
    if (managerglobal.name && managerglobal.countryId && managerglobal.age > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [managerglobal]);

  const handleOnChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setManagerglobal({
      ...managerglobal,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setManagerglobal({
      ...managerglobal,
      countryId: Number(value),
    });
  };

  const handleOnClickInsert = async () => {
    setLoading(true);

    await request(URL_MANAGERGLOBAL, MethodsEnum.POST, undefined, managerglobal).then(() => {
      setNotification('Sucesso!', 'success', 'Treinador inserido com sucesso!');
    });

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);

    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

    setLoading(false);

    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  return {
    managerglobal,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
  };
};
