import { useDispatch } from 'react-redux';

import { FormationType } from '../../../shared/types/Formation.type';
import { useAppSelector } from '../../hooks';
import { setFormationsAction } from '.';

export const useFormationReducer = () => {
  const dispatch = useDispatch();
  const { formations } = useAppSelector((state) => state.formationReducer);

  const setFormations = (formations: FormationType[]) => {
    dispatch(setFormationsAction(formations));
  };

  return {
    formations,
    setFormations,
  };
};
