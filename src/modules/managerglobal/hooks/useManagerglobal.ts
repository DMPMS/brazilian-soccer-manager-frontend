import { useEffect, useState } from 'react';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';

export const useManagerglobal = () => {
  const {
    managersglobal,
    managersglobalWithoutTeamglobal,
    setManagersglobal,
    setManagersglobalWithoutTeamglobal,
  } = useManagerglobalReducer();
  const { request } = useRequests();

  const [searchValue, setSearchValue] = useState('');

  const managersglobalFiltered = managersglobal.filter((managerglobal) =>
    managerglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!managersglobal || managersglobal.length === 0) {
      request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
    }
  }, []);

  useEffect(() => {
    if (!managersglobalWithoutTeamglobal || managersglobalWithoutTeamglobal.length === 0) {
      request(
        URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
        MethodsEnum.GET,
        setManagersglobalWithoutTeamglobal,
      );
    }
  }, []);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    managersglobal: managersglobalFiltered,
    managersglobalWithoutTeamglobal,
    handleOnSearch,
  };
};
