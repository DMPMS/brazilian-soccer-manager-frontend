import { useEffect } from 'react';

import { URL_SAVE } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useSaveReducer } from '../../../../store/reducers/saveReducer/useSaveReducer';

export const useSave = () => {
  const { saves, setSaves } = useSaveReducer();

  const { newRequest } = useNewRequests();

  useEffect(() => {
    if (!saves || saves.length === 0) {
      newRequest(MethodsEnum.GET, URL_SAVE).then((data) => {
        setSaves(data);
      });
    }
  }, []);

  return {
    saves,
  };
};
