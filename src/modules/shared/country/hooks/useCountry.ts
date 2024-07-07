import { useEffect } from 'react';

import { URL_COUNTRY } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useCountryReducer } from '../../../../store/reducers/countryReducer/useCountryReducer';

export const useCountry = () => {
  const { countries, setCountries } = useCountryReducer();

  const { newRequest } = useNewRequests();

  useEffect(() => {
    if (!countries || countries.length === 0) {
      newRequest(MethodsEnum.GET, URL_COUNTRY).then((data) => {
        setCountries(data);
      });
    }
  }, []);

  return {
    countries,
  };
};
