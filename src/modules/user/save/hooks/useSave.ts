import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_SAVE, URL_SAVE_ID } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { logout } from '../../../../shared/functions/connection/auth';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { SaveType } from '../../../../shared/types/Save.type';
import { useSavePlayReducer } from '../../../../store/reducers/savePlayReducer/useSavePlayReducer';
import { useSaveReducer } from '../../../../store/reducers/saveReducer/useSaveReducer';
import { SavePlayRoutesEnum } from '../../savePlay/routes';
import { SaveRoutesEnum } from '../routes';

export const useSave = () => {
  const { saves, setSaves } = useSaveReducer();
  const { setSavePlay } = useSavePlayReducer();

  const { newRequest } = useNewRequests();
  const navigate = useNavigate();

  const [savePlayId, setSavePlayId] = useState<number | undefined>(undefined);
  const [openModalLogout, setOpenModalLogout] = useState(false);

  useEffect(() => {
    if (!saves || saves.length === 0) {
      newRequest(MethodsEnum.GET, URL_SAVE).then((data: SaveType[]) => {
        setSaves(data);
      });
    }
  }, []);

  const handleOnInsert = () => {
    navigate(SaveRoutesEnum.SAVE_INSERT);
  };

  const handleOnLogout = () => {
    setOpenModalLogout(true);
  };

  const handleOnCancelLogout = () => {
    setOpenModalLogout(false);
  };

  const handleOnConfirmLogout = () => {
    logout(navigate);
  };

  const handleOnPlaySave = async (saveId: number) => {
    setSavePlayId(saveId);

    await newRequest(MethodsEnum.GET, URL_SAVE_ID.replace('{saveId}', String(saveId))).then(
      (data: SaveType) => {
        setSavePlay(data);
      },
    );

    navigate(SavePlayRoutesEnum.SAVE_PLAY_HOME);
  };

  return {
    saves,
    savePlayId,
    openModalLogout,
    handleOnInsert,
    handleOnLogout,
    handleOnCancelLogout,
    handleOnConfirmLogout,
    handleOnPlaySave,
  };
};
