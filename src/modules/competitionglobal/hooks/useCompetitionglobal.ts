import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_COMPETITIONGLOBAL,
  URL_COMPETITIONGLOBAL_ID,
  URL_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCompetitionglobalReducer } from '../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';
import { useTeamglobalReducer } from '../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { CompetitionglobalRoutesEnum } from '../routes';

export const useCompetitionglobal = () => {
  const { competitionsglobal, setCompetitionsglobal } = useCompetitionglobalReducer();
  const { setTeamsglobal } = useTeamglobalReducer();

  const { request } = useRequests();
  const navigate = useNavigate();

  const [competitionglobalIdDelete, setCompetitionglobalIdDelete] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState('');

  const competitionsglobalFiltered = competitionsglobal.filter((competitionglobal) =>
    competitionglobal.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (!competitionsglobal || competitionsglobal.length === 0) {
      request(URL_COMPETITIONGLOBAL, MethodsEnum.GET, setCompetitionsglobal);
    }
  }, []);

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
    await request(
      URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', `${competitionglobalIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Competição excluída com sucesso!',
    );

    await request(URL_COMPETITIONGLOBAL, MethodsEnum.GET, setCompetitionsglobal);

    await request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);

    setCompetitionglobalIdDelete(undefined);
  };

  const handleOnCloseModalDelete = () => {
    setCompetitionglobalIdDelete(undefined);
  };

  const handleOnOpenModalDelete = (competitionglobalId: number) => {
    setCompetitionglobalIdDelete(competitionglobalId);
  };

  return {
    competitionsglobal: competitionsglobalFiltered,
    handleOnSearch,
    handleOnEdit,
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!competitionglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
