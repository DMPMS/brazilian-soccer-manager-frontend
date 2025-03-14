import { useDispatch } from 'react-redux';

import { CompetitionsaveType } from '../../../shared/types/Competitionsave.type';
import { MatchType } from '../../../shared/types/Match.type';
import { SaveType } from '../../../shared/types/Save.type';
import { useAppSelector } from '../../hooks';
import {
  setSavePlayAction,
  setSavePlayCompetitionsaveAction,
  setSavePlayCompetitionssaveAction,
  setSavePlayPlayMatchAction,
} from '.';

export const useSavePlayReducer = () => {
  const dispatch = useDispatch();
  const { savePlay, savePlayCompetitionssave, savePlayCompetitionsave, savePlayPlayMatch } =
    useAppSelector((state) => state.savePlayReducer);

  const setSavePlay = (savePlay?: SaveType) => {
    dispatch(setSavePlayAction(savePlay));
  };

  const setSavePlayCompetitionssave = (savePlayCompetitionssave: CompetitionsaveType[]) => {
    dispatch(setSavePlayCompetitionssaveAction(savePlayCompetitionssave));
  };

  const setSavePlayCompetitionsave = (savePlayCompetitionsave?: CompetitionsaveType) => {
    dispatch(setSavePlayCompetitionsaveAction(savePlayCompetitionsave));
  };

  const setSavePlayPlayMatch = (savePlayPlayMatch?: MatchType) => {
    dispatch(setSavePlayPlayMatchAction(savePlayPlayMatch));
  };

  return {
    savePlay,
    savePlayCompetitionssave,
    savePlayCompetitionsave,
    savePlayPlayMatch,
    setSavePlay,
    setSavePlayCompetitionssave,
    setSavePlayCompetitionsave,
    setSavePlayPlayMatch,
  };
};
