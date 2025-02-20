import { useEffect } from 'react';

import { URL_FORMATION } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useFormationReducer } from '../../../../store/reducers/formationReducer/useFormationReducer';

export const useFormation = () => {
  const { formations, setFormations } = useFormationReducer();

  const { newRequest } = useNewRequests();

  useEffect(() => {
    if (!formations || formations.length === 0) {
      newRequest(MethodsEnum.GET, URL_FORMATION).then((data) => {
        setFormations(data);
      });
    }
  }, []);

  return {
    formations,
  };
};
