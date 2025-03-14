import { useNavigate } from 'react-router-dom';

import { URL_PLAY_MATCH_ID } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { MatchType } from '../../../../shared/types/Match.type';
import { useSavePlayReducer } from '../../../../store/reducers/savePlayReducer/useSavePlayReducer';
import { SavePlayRoutesEnum } from '../routes';
import { useSavePlay } from './useSavePlay';

export const useSavePlayHome = () => {
  const { savePlay, savePlayTeamsaveMatches } = useSavePlay();
  const { setSavePlayPlayMatch } = useSavePlayReducer();

  const { newRequest } = useNewRequests();
  const navigate = useNavigate();

  const first4Matches = savePlayTeamsaveMatches.slice(0, 4);

  const handleOnPlayMatch = async (matchId: number) => {
    await newRequest(
      MethodsEnum.GET,
      URL_PLAY_MATCH_ID.replace('{matchId}', String(matchId)),
      false,
      { saveId: savePlay?.id },
    ).then((data: MatchType) => {
      setSavePlayPlayMatch(data);
    });

    navigate(SavePlayRoutesEnum.SAVE_PLAY_PLAY_MATCH);
  };

  return { first4Matches, handleOnPlayMatch };
};
