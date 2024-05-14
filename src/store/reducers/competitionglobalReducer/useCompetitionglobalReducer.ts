import { useDispatch } from 'react-redux';

import { CompetitionglobalType } from '../../../shared/types/CompetitionglobalType';
import { useAppSelector } from '../../hooks';
import { setCompetitionsglobalAction } from '.';

export const useCompetitionglobalReducer = () => {
  const dispatch = useDispatch();
  const { competitionsglobal } = useAppSelector((state) => state.competitionglobalReducer);

  const setCompetitionsglobal = (competitionsglobal: CompetitionglobalType[]) => {
    dispatch(setCompetitionsglobalAction(competitionsglobal));
  };

  return {
    competitionsglobal,
    setCompetitionsglobal,
  };
};
