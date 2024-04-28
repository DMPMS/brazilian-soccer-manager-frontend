import { useEffect } from 'react';

import { URL_COUNTRY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';

export const useCountry = () => {
  const { countries, setCountries } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    if (!countries || countries.length === 0) {
      request(URL_COUNTRY, MethodsEnum.GET, setCountries);
    }
  }, []);

  return {
    countries,
  };
};
