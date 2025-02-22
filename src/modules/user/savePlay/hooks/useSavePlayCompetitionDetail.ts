import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_COMPETITIONSAVE_ID } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { CompetitionsaveType } from '../../../../shared/types/Competitionsave.type';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useSavePlayReducer } from '../../../../store/reducers/savePlayReducer/useSavePlayReducer';
import { SavePlayRoutesEnum } from '../routes';

export const useSavePlayCompetitionDetail = (competitionsaveId?: string) => {
  const { savePlay, savePlayCompetitionsave, setSavePlayCompetitionsave } = useSavePlayReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest } = useNewRequests();
  const navigate = useNavigate();

  const [loadingCompetitionsave, setLoadingCompetitionsave] = useState(true);

  useEffect(() => {
    if (competitionsaveId) {
      const findAndSetCompetitionsaveReducer = async (competitionsaveId: string) => {
        await newRequest(
          MethodsEnum.GET,
          URL_COMPETITIONSAVE_ID.replace('{competitionsaveId}', competitionsaveId),
          false,
          { saveId: savePlay?.id },
        ).then((data: CompetitionsaveType) => {
          setSavePlayCompetitionsave(data);
        });

        setLoadingCompetitionsave(false);
      };

      findAndSetCompetitionsaveReducer(competitionsaveId);
    } else {
      setSavePlayCompetitionsave(undefined);

      setNotification('Selecione a competição.', 'warning');
      navigate(SavePlayRoutesEnum.SAVE_PLAY_COMPETITION);
    }
  }, [competitionsaveId]);

  return {
    loadingCompetitionsave,
    savePlayCompetitionsave,
  };
};
