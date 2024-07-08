import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_COMPETITIONGLOBAL,
  URL_COMPETITIONGLOBAL_ID,
  URL_TEAMGLOBAL,
} from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useCompetitionglobalReducer } from '../../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { CompetitionglobalRoutesEnum } from '../routes';

export const useCompetitionglobal = () => {
  const { competitionsglobal, setCompetitionsglobal } = useCompetitionglobalReducer();
  const { setTeamsglobal } = useTeamglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [competitionglobalIdDelete, setCompetitionglobalIdDelete] = useState<number | undefined>(
    undefined,
  );
  const [searchValue, setSearchValue] = useState('');

  const competitionsglobalFiltered = competitionsglobal.filter((competitionglobal) =>
    competitionglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!competitionsglobal || competitionsglobal.length === 0) {
      newRequest(MethodsEnum.GET, URL_COMPETITIONGLOBAL).then((data) => {
        setCompetitionsglobal(data);
      });
    }
  }, []);

  const handleOnClickInsert = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT);
  };

  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleOnEdit = (competitionglobalId: number) => {
    navigate(
      CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_EDIT.replace(
        ':competitionglobalId',
        `${competitionglobalId}`,
      ),
    );
  };

  const handleOnDelete = async () => {
    await newRequest(
      MethodsEnum.DELETE,
      URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', `${competitionglobalIdDelete}`),
    );

    await newRequest(MethodsEnum.GET, URL_COMPETITIONGLOBAL).then((data) => {
      setCompetitionsglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data) => {
      setTeamsglobal(data);
    });

    setCompetitionglobalIdDelete(undefined);

    setNotification('Competição excluída.', 'success');
  };

  const handleOnCloseModalDelete = () => {
    setCompetitionglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (competitionglobalId: number) => {
    setCompetitionglobalIdDelete(competitionglobalId);
  };

  return {
    loading,
    competitionsglobal: competitionsglobalFiltered,
    handleOnClickInsert,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!competitionglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
