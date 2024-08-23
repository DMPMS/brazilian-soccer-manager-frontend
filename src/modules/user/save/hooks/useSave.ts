import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_SAVE } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { logout } from '../../../../shared/functions/connection/auth';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useSaveReducer } from '../../../../store/reducers/saveReducer/useSaveReducer';
import { SaveRoutesEnum } from '../routes';

export const useSave = () => {
  const { saves, setSaves } = useSaveReducer();

  const { newRequest } = useNewRequests();
  const navigate = useNavigate();

  const [openModalLogout, setOpenModalLogout] = useState(false);

  useEffect(() => {
    if (!saves || saves.length === 0) {
      newRequest(MethodsEnum.GET, URL_SAVE).then((data) => {
        setSaves(data);
      });
    }
  }, []);

  const handleOnClickInsert = () => {
    navigate(SaveRoutesEnum.SAVE_INSERT);
  };

  const handleOnClickLogout = () => {
    setOpenModalLogout(true);
  };

  const handleOnCancelLogout = () => {
    setOpenModalLogout(false);
  };

  const handleOnConfirmLogout = () => {
    logout(navigate);
  };

  return {
    saves,
    openModalLogout,
    handleOnClickInsert,
    handleOnClickLogout,
    handleOnCancelLogout,
    handleOnConfirmLogout,
  };
};
