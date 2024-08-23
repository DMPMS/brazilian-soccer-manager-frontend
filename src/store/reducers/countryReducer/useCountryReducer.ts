import { useDispatch } from 'react-redux';

import { CountryType } from '../../../shared/types/Country.type';
import { useAppSelector } from '../../hooks';
import { setCountriesAction } from '.';

export const useCountryReducer = () => {
  const dispatch = useDispatch();
  const { countries } = useAppSelector((state) => state.countryReducer);

  const setCountries = (countries: CountryType[]) => {
    dispatch(setCountriesAction(countries));
  };

  return {
    countries,
    setCountries,
  };
};
