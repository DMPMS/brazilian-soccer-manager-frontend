import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
  URL_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { InsertTeamglobalDTO } from '../../../shared/dtos/InsertTeamglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useManagerglobalReducer } from '../../../store/reducers/managerglobalReducer/useManagerglobalReducer';
import { useTeamglobalReducer } from '../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { TeamglobalRoutesEnum } from '../routes';

export const useInsertTeamglobal = () => {
  const navigate = useNavigate();

  const { request } = useRequests();
  const { setTeamsglobal } = useTeamglobalReducer();
  const { setManagersglobalWithoutTeamglobal } = useManagerglobalReducer();

  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [teamglobal, setTeamglobal] = useState<InsertTeamglobalDTO>({
    name: '',
    srcImage: '',
  });

  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleUploadImage = (file: File | null, nameObject: string) => {
  //   if (file !== null) {
  //     setSelectedFile(file);
  //     setTeamglobal({
  //       ...teamglobal,
  //       [nameObject]: file.name,
  //     });
  //   } else {
  //     setSelectedFile(file);
  //     setTeamglobal({
  //       ...teamglobal,
  //       [nameObject]: '',
  //     });
  //   }
  // };

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

    await request(
      URL_TEAMGLOBAL,
      MethodsEnum.POST,
      undefined,
      teamglobal,
      'Time inserido com sucesso!',
    );

    await request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);

    await request(
      URL_MANAGERGLOBAL_WITHOUT_TEAMGLOBAL,
      MethodsEnum.GET,
      setManagersglobalWithoutTeamglobal,
    );

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
    // handleUploadImage,
  };
};
