import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_MANAGERGLOBAL } from '../../../shared/constants/urls';
import { InsertManagerglobalDto } from '../../../shared/dtos/InsertManagerglobal.dto';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';
import { ManagerglobalRoutesEnum } from '../routes';

export const useInsertManagerglobal = () => {
  const navigate = useNavigate();
  const { setNotification } = useGlobalContext();
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

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
    isNumber?: boolean,
  ) => {
    setManagerglobal({
      ...managerglobal,
      [nameObject]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    setManagerglobal({
      ...managerglobal,
      countryId: Number(value),
    });
  };

  const handleInsertManagerglobal = async () => {
    setLoading(true);
    await connectionAPIPost(URL_MANAGERGLOBAL, managerglobal)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Treinador inserido com sucesso!');
        navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  return {
    managerglobal,
    loading,
    disabledButton,
    onChangeInput,
    handleInsertManagerglobal,
    handleChangeSelect,
  };
};
