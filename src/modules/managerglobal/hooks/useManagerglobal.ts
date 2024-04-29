import { useEffect, useState } from 'react';

import { URL_MANAGERGLOBAL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';

export const useManagerglobal = () => {
  const { managersglobal, setManagersglobal } = useManagerglobalReducer();
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

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    managersglobal: managersglobalFiltered,
    handleOnSearch,
  };
};
