import { useEffect, useState } from 'react';

import { URL_TEAMGLOBAL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';

export const useTeamglobal = () => {
  const { teamsglobal, setTeamsglobal } = useDataContext();
  const { request } = useRequests();

  const [searchValue, setSearchValue] = useState('');

  const teamsglobalFiltered = teamsglobal.filter((teamglobal) =>
    teamglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!teamsglobal || teamsglobal.length === 0) {
      request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);
    }
  }, []);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    teamsglobal: teamsglobalFiltered,
    handleOnSearch,
  };
};
