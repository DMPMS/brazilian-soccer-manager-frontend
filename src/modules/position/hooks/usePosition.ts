import { useEffect } from 'react';

import { URL_POSITION } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { usePositionReducer } from '../../../store/reducers/positionReducer/usePositionReducer';

export const usePosition = () => {
  const { positions, setPositions } = usePositionReducer();

  const { request } = useRequests();

  useEffect(() => {
    if (!positions || positions.length === 0) {
      request(URL_POSITION, MethodsEnum.GET, setPositions);
    }
  }, []);

  return {
    positions,
  };
};
