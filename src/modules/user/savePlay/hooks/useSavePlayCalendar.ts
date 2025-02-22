import { RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { MONTH_YEAR_FORMAT } from '../../../../shared/constants/others';
import { useSavePlay } from './useSavePlay';

export const useSavePlayCalendar = () => {
  const { savePlayTeamsaveMatches, savePlay } = useSavePlay();

  const [matchLocationFilter, setMatchLocationFilter] = useState<'home' | 'away' | 'all'>('all');
  const [monthFilter, setMonthFilter] = useState<string | undefined>(undefined);

  const savePlayTeamsaveFilteredMatches = useMemo(() => {
    return savePlayTeamsaveMatches.filter((match) => {
      const savePlayTeamsaveId = savePlay?.controllerManagersave?.teamsave?.id;

      const isHome =
        matchLocationFilter === 'home' && match.teamsaveHome?.id === savePlayTeamsaveId;

      const isAway =
        matchLocationFilter === 'away' && match.teamsaveAway?.id === savePlayTeamsaveId;

      const isMonthMatch =
        !monthFilter || dayjs(match.date).format(MONTH_YEAR_FORMAT) === monthFilter;

      return (matchLocationFilter === 'all' || isHome || isAway) && isMonthMatch;
    });
  }, [matchLocationFilter, monthFilter]);

  const savePlayDistinctMatchMonths = Array.from(
    new Set(savePlayTeamsaveMatches?.map((match) => dayjs(match.date).format(MONTH_YEAR_FORMAT))),
  );

  const handleOnChangeRadio = (event: RadioChangeEvent) => {
    const radioValue = event.target.value;
    setMatchLocationFilter(radioValue);
  };

  const handleOnChangeMonthSelect = (value: string) => {
    const selectValue = value;
    setMonthFilter(selectValue);
  };

  return {
    savePlayTeamsaveMatches: savePlayTeamsaveFilteredMatches,
    savePlayDistinctMatchMonths,
    handleOnChangeRadio,
    handleOnChangeMonthSelect,
  };
};
