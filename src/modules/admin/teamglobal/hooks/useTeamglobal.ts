import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL,
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
  URL_TEAMGLOBAL,
  URL_TEAMGLOBAL_ID,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useRequests } from '../../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { TeamglobalRoutesEnum } from '../routes';

export const useTeamglobal = () => {
  const { teamsglobal, setTeamsglobal } = useTeamglobalReducer();
  const { setManagersglobalWithoutTeamglobal, setManagersglobal } = useManagerglobalReducer();

  const { request } = useRequests();
  const navigate = useNavigate();

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

  const handleOnClickInsert = () => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL_INSERT);
  };

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnEdit = (teamglobalId: number) => {
    navigate(TeamglobalRoutesEnum.TEAMGLOBAL_EDIT.replace(':teamglobalId', `${teamglobalId}`));
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

    await request(URL_MANAGERGLOBAL, MethodsEnum.GET, setManagersglobal);
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
    handleOnClickInsert,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!teamglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
