import { useDispatch } from 'react-redux';

import { CompetitionglobalType } from '../../../shared/types/CompetitionglobalType';
import { useAppSelector } from '../../hooks';
import { setCompetitionglobalAction, setCompetitionsglobalAction } from '.';

export const useCompetitionglobalReducer = () => {
  const dispatch = useDispatch();
  const { competitionsglobal, competitionglobal } = useAppSelector(
    (state) => state.competitionglobalReducer,
  );

  const setCompetitionsglobal = (competitionsglobal: CompetitionglobalType[]) => {
    dispatch(setCompetitionsglobalAction(competitionsglobal));
  };

  const setCompetitionglobal = (competitionglobal?: CompetitionglobalType) => {
    dispatch(setCompetitionglobalAction(competitionglobal));
  };

  return {
    competitionsglobal,
    competitionglobal,
    setCompetitionsglobal,
    setCompetitionglobal,
  };
};
