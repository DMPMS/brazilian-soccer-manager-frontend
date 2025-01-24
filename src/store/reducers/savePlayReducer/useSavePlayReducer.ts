import { useDispatch } from 'react-redux';

import { SaveType } from '../../../shared/types/Save.type';
import { useAppSelector } from '../../hooks';
import { setSavePlayAction } from '.';

export const useSavePlayReducer = () => {
  const dispatch = useDispatch();
  const { savePlay } = useAppSelector((state) => state.savePlayReducer);

  const setSavePlay = (savePlay?: SaveType) => {
    dispatch(setSavePlayAction(savePlay));
  };

  return {
    savePlay,
    setSavePlay,
  };
};
