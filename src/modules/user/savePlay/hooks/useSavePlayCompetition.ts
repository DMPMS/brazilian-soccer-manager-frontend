import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_COMPETITIONSAVE } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useSavePlayReducer } from '../../../../store/reducers/savePlayReducer/useSavePlayReducer';
import { SavePlayRoutesEnum } from '../routes';

export const useSavePlayCompetition = () => {
  const { savePlay, savePlayCompetitionssave, setSavePlayCompetitionssave } = useSavePlayReducer();

  const { newRequest } = useNewRequests();

  const navigate = useNavigate();

  useEffect(() => {
    if (!savePlayCompetitionssave || savePlayCompetitionssave.length === 0) {
      newRequest(MethodsEnum.GET, URL_COMPETITIONSAVE, false, { saveId: savePlay?.id }).then(
        (data) => {
          setSavePlayCompetitionssave(data);
        },
      );
    }
  }, []);

  const handleOnDetail = (competitionsaveId: number) => {
    navigate(
      SavePlayRoutesEnum.SAVE_PLAY_COMPETITION_DETAIL.replace(
        ':competitionsaveId',
        `${competitionsaveId}`,
      ),
    );
  };

  return {
    savePlayCompetitionssave,
    handleOnDetail,
  };
};
