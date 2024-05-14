import { useEffect, useState } from 'react';

import { URL_COMPETITIONGLOBAL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCompetitionglobalReducer } from '../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';

export const useCompetitionglobal = () => {
  const { competitionsglobal, setCompetitionsglobal } = useCompetitionglobalReducer();
  const { request } = useRequests();

  const [searchValue, setSearchValue] = useState('');

  const competitionsglobalFiltered = competitionsglobal.filter((competitionglobal) =>
    competitionglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!competitionsglobal || competitionsglobal.length === 0) {
      request(URL_COMPETITIONGLOBAL, MethodsEnum.GET, setCompetitionsglobal);
    }
  }, []);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    competitionsglobal: competitionsglobalFiltered,
    handleOnSearch,
  };
};
