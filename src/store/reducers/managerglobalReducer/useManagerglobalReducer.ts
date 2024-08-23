import { useDispatch } from 'react-redux';

import { ManagerglobalType } from '../../../shared/types/Managerglobal.type';
import { useAppSelector } from '../../hooks';
import { setManagerglobalAction, setManagersglobalAction } from '.';

export const useManagerglobalReducer = () => {
  const dispatch = useDispatch();
  const { managersglobal, managerglobal } = useAppSelector((state) => state.managerglobalReducer);

  const setManagersglobal = (managersglobal: ManagerglobalType[]) => {
    dispatch(setManagersglobalAction(managersglobal));
  };

  const setManagerglobal = (managerglobal?: ManagerglobalType) => {
    dispatch(setManagerglobalAction(managerglobal));
  };

  return {
    managersglobal,
    managerglobal,
    setManagersglobal,
    setManagerglobal,
  };
};
