import { useDispatch } from 'react-redux';

import { PlayerglobalType } from '../../../shared/types/PlayerglobalType';
import { useAppSelector } from '../../hooks';
import { setPlayerglobalAction, setPlayersglobalAction } from '.';

export const usePlayerglobalReducer = () => {
  const dispatch = useDispatch();
  const { playersglobal, playerglobal } = useAppSelector((state) => state.playerglobalReducer);

  const setPlayersglobal = (playersglobal: PlayerglobalType[]) => {
    dispatch(setPlayersglobalAction(playersglobal));
  };

  const setPlayerglobal = (playerglobal?: PlayerglobalType) => {
    dispatch(setPlayerglobalAction(playerglobal));
  };

  return {
    playersglobal,
    playerglobal,
    setPlayersglobal,
    setPlayerglobal,
  };
};
