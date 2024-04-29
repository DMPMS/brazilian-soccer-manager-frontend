import { useDispatch } from 'react-redux';

import { TeamglobalType } from '../../../shared/types/TeamglobalType';
import { useAppSelector } from '../../hooks';
import { setTeamsglobalAction } from '.';

export const useTeamglobalReducer = () => {
  const dispatch = useDispatch();
  const { teamsglobal } = useAppSelector((state) => state.teamglobalReducer);

  const setTeamsglobal = (teamsglobal: TeamglobalType[]) => {
    dispatch(setTeamsglobalAction(teamsglobal));
  };

  return {
    teamsglobal,
    setTeamsglobal,
  };
};
