import { useDispatch } from 'react-redux';

import { SaveType } from '../../../shared/types/SaveType';
import { useAppSelector } from '../../hooks';
import { setSaveAction, setSavesAction } from '.';

export const useSaveReducer = () => {
  const dispatch = useDispatch();
  const { saves, save } = useAppSelector((state) => state.saveReducer);

  const setSaves = (saves: SaveType[]) => {
    dispatch(setSavesAction(saves));
  };

  const setSave = (saves?: SaveType) => {
    dispatch(setSaveAction(saves));
  };

  return {
    saves,
    save,
    setSaves,
    setSave,
  };
};
