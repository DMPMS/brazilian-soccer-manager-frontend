import { useDispatch } from 'react-redux';

import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';
import { useAppSelector } from '../../hooks';
import { setManagersglobalAction } from '.';

export const useManagerglobalReducer = () => {
  const dispatch = useDispatch();
  const { managersglobal } = useAppSelector((state) => state.managerglobalReducer);

  const setManagersglobal = (managersglobal: ManagerglobalType[]) => {
    dispatch(setManagersglobalAction(managersglobal));
  };

  return {
    managersglobal,
    setManagersglobal,
  };
};
