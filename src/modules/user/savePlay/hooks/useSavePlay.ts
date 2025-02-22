import { MatchType } from '../../../../shared/types/Match.type';
import { PlayersaveType } from '../../../../shared/types/Playersave.type';
import { useSavePlayReducer } from '../../../../store/reducers/savePlayReducer/useSavePlayReducer';

export const useSavePlay = () => {
  const { savePlay } = useSavePlayReducer();

  const savePlayTeamsaveMatches: MatchType[] =
    savePlay?.controllerManagersave?.teamsave?.matches || [];

  const savePlayTeamsavePlayerssave: PlayersaveType[] =
    savePlay?.controllerManagersave?.teamsave?.playerssave || [];

  return {
    savePlay,
    savePlayTeamsaveMatches,
    savePlayTeamsavePlayerssave,
  };
};
