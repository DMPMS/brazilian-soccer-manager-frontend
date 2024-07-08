import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL,
  URL_PLAYERGLOBAL,
  URL_TEAMGLOBAL,
  URL_TEAMGLOBAL_ID,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useManagerglobalReducer } from '../../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { usePlayerglobalReducer } from '../../../../store/reducers/playerglobalReducer/usePlayerglobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { TeamglobalRoutesEnum } from '../routes';

export const useTeamglobal = () => {
  const { teamsglobal, setTeamsglobal } = useTeamglobalReducer();
  const { setManagersglobal } = useManagerglobalReducer();
  const { setPlayersglobal } = usePlayerglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [teamglobalIdDelete, setTeamglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const teamsglobalFiltered = teamsglobal.filter((teamglobal) =>
    teamglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!teamsglobal || teamsglobal.length === 0) {
      newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data) => {
        setTeamsglobal(data);
      });
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
    await newRequest(
      MethodsEnum.DELETE,
      URL_TEAMGLOBAL_ID.replace('{teamglobalId}', `${teamglobalIdDelete}`),
    );

    await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data) => {
      setTeamsglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_PLAYERGLOBAL).then((data) => {
      setPlayersglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_MANAGERGLOBAL).then((data) => {
      setManagersglobal(data);
    });

    setTeamglobalIdDelete(undefined);

    setNotification('Time excluído.', 'success');
  };

  const handleOnCloseModalDelete = () => {
    setTeamglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (teamglobalId: number) => {
    setTeamglobalIdDelete(teamglobalId);
  };

  return {
    loading,
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
