import { RadioChangeEvent } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_CUSTOMMANAGER, DEFAULT_SAVE } from '../../../../shared/constants/dtos';
import {
  CURRENT_DATE_UTC,
  DEFAULT_DATE_FORMAT,
  SAVE_MAX_LENGH_MANAGER_NAME,
  SAVE_MAX_LENGH_NAME,
  SAVE_MAX_MANAGER_AGE,
  SAVE_MIN_LENGH_MANAGER_NAME,
  SAVE_MIN_LENGH_NAME,
  SAVE_MIN_MANAGER_AGE,
} from '../../../../shared/constants/others';
import { URL_SAVE } from '../../../../shared/constants/urls';
import { CustomManagerDTO } from '../../../../shared/dtos/customManager.dto';
import { InsertSaveDTO } from '../../../../shared/dtos/InsertSave.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useSaveReducer } from '../../../../store/reducers/saveReducer/useSaveReducer';
import { useCompetitionglobal } from '../../../admin/competitionglobal/hooks/useCompetitionglobal';
import { useManagerglobal } from '../../../admin/managerglobal/hooks/useManagerglobal';
import { SaveRoutesEnum } from '../routes';
import { useSave } from './useSave';

export const useInsertSave = () => {
  const { setSaves } = useSaveReducer();
  const { user, setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [disabledButton, setDisabledButton] = useState(true);
  const [save, setSave] = useState<InsertSaveDTO>(DEFAULT_SAVE);

  const [formSave] = useForm();

  const { competitionsglobal } = useCompetitionglobal();
  const { managersglobal } = useManagerglobal();
  const { saves } = useSave();

  const [competitionsglobalDistinctCountryIds, setCompetitionsglobalDistinctCountryIds] = useState<
    number[]
  >([]);
  const [selectedCompetitionsglobalCountryId, setSelectedCompetitionsglobalCountryId] = useState<
    number | undefined
  >(undefined);
  const [selectedCompetitionglobalId, setSelectedCompetitionglobalId] = useState<
    number | undefined
  >(undefined);

  const [selectedRadioOption, setSelectedRadioOption] = useState<string>('default');
  const [userSaveNames, setUserSaveNames] = useState<string[]>([]);
  const [customManager, setCustomManager] = useState<CustomManagerDTO>(DEFAULT_CUSTOMMANAGER);

  useEffect(() => {
    setCompetitionsglobalDistinctCountryIds([
      ...new Set(competitionsglobal.map((competitionglobal) => competitionglobal.country!.id)),
    ]);
  }, [competitionsglobal]);

  useEffect(() => {
    const saveNames: string[] = [];

    saves.forEach((save) => {
      saveNames.push(save.name);
    });

    setUserSaveNames(saveNames);
  }, [saves]);

  useEffect(() => {
    setCustomManager({
      managerName: user?.name || '',
      managerBirthdate: user?.birthdate || '',
      managerCountryId: user?.country?.id,
    });
  }, [user]);

  useEffect(() => {
    if (
      save.name.length >= SAVE_MIN_LENGH_NAME &&
      save.name.length <= SAVE_MAX_LENGH_NAME &&
      !userSaveNames.includes(save.name) &&
      save.competitionsglobalCountryId &&
      save.competitionglobalId &&
      save.teamglobalId &&
      (!save.isCustomManager ||
        (save.isCustomManager &&
          save.managerName &&
          save.managerName.length >= SAVE_MIN_LENGH_MANAGER_NAME &&
          save.managerName.length <= SAVE_MAX_LENGH_MANAGER_NAME &&
          save.managerBirthdate &&
          save.managerCountryId))
    ) {
      if (!save.isCustomManager) {
        setDisabledButton(false);
      } else {
        const birthdate = dayjs(save.managerBirthdate).startOf('day');
        const minDate = CURRENT_DATE_UTC.subtract(SAVE_MIN_MANAGER_AGE, 'year').startOf('day');
        const maxDate = CURRENT_DATE_UTC.subtract(SAVE_MAX_MANAGER_AGE, 'year').startOf('day');

        if (!(birthdate.isAfter(minDate) || birthdate.isBefore(maxDate))) {
          setDisabledButton(false);
        } else {
          setDisabledButton(true);
        }
      }
    } else {
      setDisabledButton(true);
    }
  }, [save]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    const inputValue = event.target.value;

    setSave({
      ...save,
      [nameObject]: inputValue,
    });

    if (nameObject === 'managerName') {
      setCustomManager({
        ...customManager,
        [nameObject]: inputValue,
      });
    }
  };

  const handleOnChangeDatePicker = (date: dayjs.Dayjs | null, nameObject: string) => {
    const selectedDate = date ? date.format(DEFAULT_DATE_FORMAT) : '';

    setSave({
      ...save,
      [nameObject]: selectedDate,
    });

    if (nameObject === 'managerBirthdate') {
      setCustomManager({
        ...customManager,
        [nameObject]: selectedDate,
      });
    }
  };

  const handleOnChangeRadio = (event: RadioChangeEvent) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'default') {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);

      setSave({
        ...save,
        isCustomManager: false,
        managerName: '',
        managerBirthdate: '',
        managerCountryId: undefined,
      });

      const managerglobal = managersglobal.find(
        (managerglobal) => managerglobal.teamglobal?.id === save.teamglobalId,
      );

      formSave.setFieldsValue({
        managerName: managerglobal ? managerglobal.name : '',
        managerBirthdate: managerglobal ? dayjs(managerglobal.birthdate) : '',
        managerCountryId:
          managerglobal?.country?.id !== undefined ? `${managerglobal.country.id}` : undefined,
      });
    } else {
      setSave({
        ...save,
        isCustomManager: true,
        managerName: customManager.managerName,
        managerBirthdate: customManager.managerBirthdate,
        managerCountryId: customManager.managerCountryId,
      });

      formSave.setFieldsValue({
        managerName: customManager.managerName,
        managerBirthdate: customManager.managerBirthdate
          ? dayjs(customManager.managerBirthdate)
          : '',
        managerCountryId:
          customManager.managerCountryId !== undefined
            ? `${customManager.managerCountryId}`
            : undefined,
      });
    }

    setSelectedRadioOption(selectedValue);
  };

  const handleOnChangeCompetitionglobalCountrySelect = (value: string) => {
    const selectedValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      competitionsglobalCountryId: selectedValue,
      competitionglobalId: undefined,
      teamglobalId: undefined,
      ...(selectedRadioOption === 'default' && { managerName: '' }),
      ...(selectedRadioOption === 'default' && { managerBirthdate: '' }),
      ...(selectedRadioOption === 'default' && { managerCountryId: undefined }),
    });

    setSelectedCompetitionglobalId(undefined);
    setSelectedCompetitionsglobalCountryId(selectedValue);

    formSave.resetFields(['competitionglobalId', 'teamglobalId']);

    if (selectedRadioOption === 'default') {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);
    }
  };

  const handleOnChangeCompetitionglobalSelect = (value: string) => {
    const selectedValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      competitionglobalId: selectedValue,
      teamglobalId: undefined,
      ...(selectedRadioOption === 'default' && { managerName: '' }),
      ...(selectedRadioOption === 'default' && { managerBirthdate: '' }),
      ...(selectedRadioOption === 'default' && { managerCountryId: undefined }),
    });

    setSelectedCompetitionglobalId(selectedValue);

    formSave.resetFields(['teamglobalId']);

    if (selectedRadioOption === 'default') {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);
    }
  };

  const handleOnChangeTeamglobalSelect = (value: string) => {
    const selectedValue = value ? Number(value) : undefined;

    if (selectedRadioOption === 'default') {
      setSave({
        ...save,
        teamglobalId: selectedValue,
        managerName: '',
        managerBirthdate: '',
        managerCountryId: undefined,
      });

      if (!selectedValue) {
        formSave.setFieldsValue({
          managerName: '',
          managerBirthdate: '',
          managerCountryId: undefined,
        });
      } else {
        const managerglobal = managersglobal.find(
          (managerglobal) => managerglobal.teamglobal?.id === selectedValue,
        );

        formSave.setFieldsValue({
          managerName: managerglobal ? managerglobal.name : '',
          managerBirthdate: managerglobal ? dayjs(managerglobal.birthdate) : '',
          managerCountryId:
            managerglobal?.country?.id !== undefined ? `${managerglobal.country.id}` : undefined,
        });
      }
    } else {
      setSave({
        ...save,
        teamglobalId: selectedValue,
      });
    }
  };

  const handleOnChangeManagerCountrySelect = (value: string) => {
    const selectedValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      managerCountryId: selectedValue,
    });

    setCustomManager({
      ...customManager,
      managerCountryId: selectedValue,
    });
  };

  const handleOnClickInsert = async () => {
    const adjustedSave: InsertSaveDTO = {
      ...save,
      ...(save.managerName === '' && { managerName: undefined }),
      ...(save.managerBirthdate === '' && { managerBirthdate: undefined }),
    };

    await newRequest(MethodsEnum.POST, URL_SAVE, false, {}, adjustedSave);

    await newRequest(MethodsEnum.GET, URL_SAVE).then((data) => {
      setSaves(data);
    });

    setNotification('Save criado.', 'success');

    navigate(SaveRoutesEnum.SAVE);
  };

  const handleOnClickReset = () => {
    setSave(DEFAULT_SAVE);
    setCustomManager({
      managerName: user?.name || '',
      managerBirthdate: user?.birthdate || '',
      managerCountryId: user?.country?.id,
    });
    formSave.resetFields();

    setCompetitionsglobalDistinctCountryIds([]);
    setSelectedCompetitionsglobalCountryId(undefined);
    setSelectedCompetitionglobalId(undefined);
    setSelectedRadioOption('default');
  };

  const handleOnClickCancel = () => {
    navigate(SaveRoutesEnum.SAVE);
  };

  return {
    loading,
    disabledButton,
    formSave,
    competitionsglobalDistinctCountryIds,
    selectedCompetitionsglobalCountryId,
    selectedCompetitionglobalId,
    selectedRadioOption,
    userSaveNames,
    handleOnChangeInput,
    handleOnChangeDatePicker,
    handleOnChangeRadio,
    handleOnChangeCompetitionglobalCountrySelect,
    handleOnChangeCompetitionglobalSelect,
    handleOnChangeTeamglobalSelect,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeManagerCountrySelect,
  };
};
