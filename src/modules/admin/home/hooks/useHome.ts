import { useNavigate } from 'react-router-dom';

import { CompetitionglobalRoutesEnum } from '../../competitionglobal/routes';
import { ManagerglobalRoutesEnum } from '../../managerglobal/routes';
import { PlayerglobalRoutesEnum } from '../../playerglobal/routes';
import { TeamglobalRoutesEnum } from '../../teamglobal/routes';

export const useHome = () => {
  const navigate = useNavigate();

  const handleOnManagerglobalCardView = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  const handleOnManagerglobalCardInsert = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT);
  };

  const handleOnPlayerglobalCardView = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  const handleOnPlayerglobalCardInsert = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL_INSERT);
  };

  const handleOnTeamglobalCardView = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  const handleOnTeamglobalCardInsert = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL_INSERT);
  };

  const handleOnCompetitionglobalCardView = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  const handleOnCompetitionglobalCardInsert = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT);
  };

  return {
    handleOnManagerglobalCardView,
    handleOnManagerglobalCardInsert,
    handleOnPlayerglobalCardView,
    handleOnPlayerglobalCardInsert,
    handleOnTeamglobalCardView,
    handleOnTeamglobalCardInsert,
    handleOnCompetitionglobalCardView,
    handleOnCompetitionglobalCardInsert,
  };
};
