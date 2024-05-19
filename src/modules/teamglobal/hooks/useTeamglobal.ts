import { useEffect, useState } from 'react';

import {
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
  URL_TEAMGLOBAL,
  URL_TEAMGLOBAL_ID,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { useTeamglobalReducer } from '../../../store/reducers/teamglobalReducer/useTeamglobalReducer';

export const useTeamglobal = () => {
  const { teamsglobal, setTeamsglobal } = useTeamglobalReducer();
  const { setManagersglobalWithoutTeamglobal } = useManagerglobalReducer();

  const { request } = useRequests();

  const [teamglobalIdDelete, setTeamglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const teamsglobalFiltered = teamsglobal.filter((teamglobal) =>
    teamglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!teamsglobal || teamsglobal.length === 0) {
      request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);
    }
  }, []);

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnDelete = async () => {
    await request(
      URL_TEAMGLOBAL_ID.replace('{teamglobalId}', `${teamglobalIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Time excluído com sucesso!',
    );

    await request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);

    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

    setTeamglobalIdDelete(undefined);
  };

  const handleOnCloseModalDelete = () => {
    setTeamglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (teamglobalId: number) => {
    setTeamglobalIdDelete(teamglobalId);
  };

  return {
    teamsglobal: teamsglobalFiltered,
    handleOnSearch,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!teamglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
