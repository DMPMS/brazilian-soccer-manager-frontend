import { useDispatch } from 'react-redux';

import { PositionType } from '../../../shared/types/PositionType';
import { useAppSelector } from '../../hooks';
import { setPositionsAction } from '.';

export const usePositionReducer = () => {
  const dispatch = useDispatch();
  const { positions } = useAppSelector((state) => state.positionReducer);

  const setPositions = (positions: PositionType[]) => {
    dispatch(setPositionsAction(positions));
  };

  return {
    positions,
    setPositions,
  };
};
