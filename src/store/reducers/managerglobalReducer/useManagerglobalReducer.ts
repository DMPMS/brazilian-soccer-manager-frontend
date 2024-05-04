import { useDispatch } from 'react-redux';

import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { useAppSelector } from '../../hooks';
import { setManagersglobalAction, setManagersglobalWithoutTeamglobalAction } from '.';

export const useManagerglobalReducer = () => {
  const dispatch = useDispatch();
  const { managersglobal, managersglobalWithoutTeamglobal } = useAppSelector(
    (state) => state.managerglobalReducer,
  );

  const setManagersglobal = (managersglobal: ManagerglobalType[]) => {
    dispatch(setManagersglobalAction(managersglobal));
  };

  const setManagersglobalWithoutTeamglobal = (
    managersglobalWithoutTeamglobal: ManagerglobalType[],
  ) => {
    dispatch(setManagersglobalWithoutTeamglobalAction(managersglobalWithoutTeamglobal));
  };

  return {
    managersglobal,
    managersglobalWithoutTeamglobal,
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
  };
};
