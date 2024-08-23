import { useDispatch } from 'react-redux';

import { TeamglobalType } from '../../../shared/types/Teamglobal.type';
import { useAppSelector } from '../../hooks';
import { setTeamglobalAction, setTeamsglobalAction } from '.';

export const useTeamglobalReducer = () => {
  const dispatch = useDispatch();
  const { teamsglobal, teamglobal } = useAppSelector((state) => state.teamglobalReducer);

  const setTeamsglobal = (teamsglobal: TeamglobalType[]) => {
    dispatch(setTeamsglobalAction(teamsglobal));
  };

  const setTeamglobal = (teamglobal?: TeamglobalType) => {
    dispatch(setTeamglobalAction(teamglobal));
  };

  return {
    teamsglobal,
    teamglobal,
    setTeamsglobal,
    setTeamglobal,
  };
};
