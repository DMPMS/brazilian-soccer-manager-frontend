import { useEffect, useState } from 'react';

import { URL_COMPETITIONGLOBAL, URL_COMPETITIONGLOBAL_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCompetitionglobalReducer } from '../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';

export const useCompetitionglobal = () => {
  const { competitionsglobal, setCompetitionsglobal } = useCompetitionglobalReducer();
  const { request } = useRequests();

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

  const handleOnDelete = async () => {
    await request(
      URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', `${competitionglobalIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Competição excluída com sucesso!',
    );

    await request(URL_COMPETITIONGLOBAL, MethodsEnum.GET, setCompetitionsglobal);

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
    handleOnDelete,
    handleOnCloseModalDelete,
    handleOnOpenModalDelete,
    openModalDelete: !!competitionglobalIdDelete, // !undefined = true, !!undefined = false
  };
};
