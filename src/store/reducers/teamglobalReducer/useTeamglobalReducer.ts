import { useDispatch } from 'react-redux';

import { TeamsglobalType } from '../../../shared/types/TeamsglobalType';
import { useAppSelector } from '../../hooks';
import { setTeamsglobalAction } from '.';

export const useTeamglobalReducer = () => {
  const dispatch = useDispatch();
  const { teamsglobal } = useAppSelector((state) => state.teamglobalReducer);

  const setTeamsglobal = (teamsglobal: TeamsglobalType[]) => {
    dispatch(setTeamsglobalAction(teamsglobal));
  };

  return {
    teamsglobal,
    setTeamsglobal,
  };
};
