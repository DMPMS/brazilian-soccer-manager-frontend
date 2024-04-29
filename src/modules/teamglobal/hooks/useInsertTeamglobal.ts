import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_TEAMGLOBAL } from '../../../shared/constants/urls';
import { InsertTeamglobalDto } from '../../../shared/dtos/InsertTeamglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useTeamglobalReducer } from '../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { TeamglobalRoutesEnum } from '../routes';

export const useInsertTeamglobal = () => {
  const navigate = useNavigate();

  const { request } = useRequests();
  const { setTeamsglobal } = useTeamglobalReducer();
  const { setNotification } = useGlobalReducer();

  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [teamglobal, setTeamglobal] = useState<InsertTeamglobalDto>({
    name: '',
    srcImage: '',
  });

  useEffect(() => {
    if (
      teamglobal.name &&
      teamglobal.srcImage &&
      teamglobal.countryId &&
      teamglobal.managerglobalId
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [teamglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setTeamglobal({
      ...teamglobal,
      [nameObject]: event.target.value,
    });
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setTeamglobal({
      ...teamglobal,
      countryId: Number(value),
    });
  };

  const handleOnChangeManagerglobalSelect = (value: string) => {
    setTeamglobal({
      ...teamglobal,
      managerglobalId: Number(value),
    });
  };

  const handleOnClickInsert = async () => {
    setLoading(true);

    await request(URL_TEAMGLOBAL, MethodsEnum.POST, undefined, teamglobal).then(() => {
      setNotification('Sucesso!', 'success', 'Time inserido com sucesso!');
    });

    await request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);

    setLoading(false);

    navigate(TeamglobalRoutesEnum.TEAMGLOBAL);
  };

  return {
    teamglobal,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeManagerglobalSelect,
  };
};
