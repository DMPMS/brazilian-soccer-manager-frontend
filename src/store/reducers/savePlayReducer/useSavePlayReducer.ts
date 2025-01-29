import { useDispatch } from 'react-redux';

import { CompetitionsaveType } from '../../../shared/types/Competitionsave.type';
import { SaveType } from '../../../shared/types/Save.type';
import { useAppSelector } from '../../hooks';
import {
  setSavePlayAction,
  setSavePlayCompetitionsaveAction,
  setSavePlayCompetitionssaveAction,
} from '.';

export const useSavePlayReducer = () => {
  const dispatch = useDispatch();
  const { savePlay, savePlayCompetitionssave, savePlayCompetitionsave } = useAppSelector(
    (state) => state.savePlayReducer,
  );

  const setSavePlay = (savePlay?: SaveType) => {
    dispatch(setSavePlayAction(savePlay));
  };

  const setSavePlayCompetitionssave = (savePlayCompetitionssave: CompetitionsaveType[]) => {
    dispatch(setSavePlayCompetitionssaveAction(savePlayCompetitionssave));
  };

  const setSavePlayCompetitionsave = (savePlayCompetitionsave?: CompetitionsaveType) => {
    dispatch(setSavePlayCompetitionsaveAction(savePlayCompetitionsave));
  };

  return {
    savePlay,
    savePlayCompetitionssave,
    savePlayCompetitionsave,
    setSavePlay,
    setSavePlayCompetitionssave,
    setSavePlayCompetitionsave,
  };
};
