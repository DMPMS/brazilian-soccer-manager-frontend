import { useNavigate } from 'react-router-dom';

import { CompetitionglobalRoutesEnum } from '../../competitionglobal/routes';
import { ManagerglobalRoutesEnum } from '../../managerglobal/routes';
import { PlayerglobalRoutesEnum } from '../../playerglobal/routes';
import { TeamglobalRoutesEnum } from '../../teamglobal/routes';

export const useHome = () => {
  const navigate = useNavigate();

  const handleOnClickManagerglobalCardView = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL);
  };

  const handleOnClickManagerglobalCardInsert = () => {
    navigate(ManagerglobalRoutesEnum.MANAGERGLOBAL_INSERT);
  };

  const handleOnClickPlayerglobalCardView = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL);
  };

  const handleOnClickPlayerglobalCardInsert = () => {
    navigate(PlayerglobalRoutesEnum.PLAYERGLOBAL_INSERT);
  };

  const handleOnClickTeamglobalCardView = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  const handleOnClickTeamglobalCardInsert = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL_INSERT);
  };

  const handleOnClickCompetitionglobalCardView = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  const handleOnClickCompetitionglobalCardInsert = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT);
  };

  return {
    handleOnClickManagerglobalCardView,
    handleOnClickManagerglobalCardInsert,
    handleOnClickPlayerglobalCardView,
    handleOnClickPlayerglobalCardInsert,
    handleOnClickTeamglobalCardView,
    handleOnClickTeamglobalCardInsert,
    handleOnClickCompetitionglobalCardView,
    handleOnClickCompetitionglobalCardInsert,
  };
};
