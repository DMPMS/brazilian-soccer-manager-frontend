import { useEffect } from 'react';

import { URL_POSITION } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { PositionType } from '../../../../shared/types/Position.type';
import { usePositionReducer } from '../../../../store/reducers/positionReducer/usePositionReducer';

export const usePosition = () => {
  const { positions, setPositions } = usePositionReducer();

  const { newRequest } = useNewRequests();

  useEffect(() => {
    if (!positions || positions.length === 0) {
      newRequest(MethodsEnum.GET, URL_POSITION).then((data: PositionType[]) => {
        setPositions(data);
      });
    }
  }, []);

  return {
    positions,
  };
};
