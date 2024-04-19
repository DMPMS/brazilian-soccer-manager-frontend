import { createContext, useContext, useState } from 'react';

import { CountryType } from '../types/CountryType';
import { ManagerglobalType } from '../types/ManagerglobalType';

interface DataContext {
  managersglobal?: ManagerglobalType[];
  countries?: CountryType[];
}

interface DataContextProps {
  data: DataContext;
  setData: (data: DataContext) => void;
}

const DataContext = createContext({} as DataContextProps);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataContext>({});

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext);

  const setManagersglobal = (managersglobal: ManagerglobalType[]) => {
    setData({
      ...data,
      managersglobal,
    });
  };

  const setCountries = (countries: CountryType[]) => {
    setData({
      ...data,
      countries,
    });
  };

  return {
    managersglobal: data?.managersglobal || [],
    countries: data?.countries || [],
    setManagersglobal,
    setCountries,
  };
};
