import { useDispatch } from 'react-redux';

import { PlayerglobalType } from '../../../shared/types/PlayerglobalType';
import { useAppSelector } from '../../hooks';
import {
  setPlayerglobalAction,
  setPlayersglobalAction,
  setPlayersglobalWithoutTeamglobalAction,
} from '.';

export const usePlayerglobalReducer = () => {
  const dispatch = useDispatch();
  const { playersglobal, playersglobalWithoutTeamglobal, playerglobal } = useAppSelector(
    (state) => state.playerglobalReducer,
  );

  const setPlayersglobal = (playersglobal: PlayerglobalType[]) => {
    dispatch(setPlayersglobalAction(playersglobal));
  };

  const setPlayersglobalWithoutTeamglobal = (
    playersglobalWithoutTeamglobal: PlayerglobalType[],
  ) => {
    dispatch(setPlayersglobalWithoutTeamglobalAction(playersglobalWithoutTeamglobal));
  };

  const setPlayerglobal = (playerglobal?: PlayerglobalType) => {
    dispatch(setPlayerglobalAction(playerglobal));
  };

  return {
    playersglobal,
    playersglobalWithoutTeamglobal,
    playerglobal,
    setPlayersglobal,
    setPlayersglobalWithoutTeamglobal,
    setPlayerglobal,
  };
};
