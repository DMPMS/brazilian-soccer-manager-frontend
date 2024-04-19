import { useEffect } from 'react';

import { URL_MANAGERGLOBAL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useDataContext } from '../../../shared/hooks/useDataContext';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ManagerglobalType } from '../../../shared/types/ManagerglobalType';

const Managerglobal = () => {
  const { managersglobal, setManagersglobal } = useDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<ManagerglobalType[]>(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
  }, []);

  return managersglobal.map((managerglobal) => (
    <div key={managerglobal.id}>
      {managerglobal.name} {managerglobal.age}
    </div>
  ));
};

export default Managerglobal;
