import { useDispatch } from 'react-redux';

import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { useAppSelector } from '../../hooks';
import {
  setManagerglobalAction,
  setManagersglobalAction,
  setManagersglobalWithoutTeamglobalAction,
} from '.';

export const useManagerglobalReducer = () => {
  const dispatch = useDispatch();
  const { managersglobal, managersglobalWithoutTeamglobal, managerglobal } = useAppSelector(
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

  const setManagerglobal = (managerglobal?: ManagerglobalType) => {
    dispatch(setManagerglobalAction(managerglobal));
  };

  return {
    managersglobal,
    managersglobalWithoutTeamglobal,
    managerglobal,
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
    setManagerglobal,
  };
};
