import { useEffect } from 'react';

import { URL_COUNTRY } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { useCountryReducer } from '../../../../store/reducers/countryReducer/useCountryReducer';

export const useCountry = () => {
  const { countries, setCountries } = useCountryReducer();

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
