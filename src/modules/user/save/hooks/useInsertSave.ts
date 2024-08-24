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
    const datePickerValue = date ? date.format(DEFAULT_DATE_FORMAT) : '';

    setSave({
      ...save,
      [nameObject]: datePickerValue,
    });

    if (nameObject === 'managerBirthdate') {
      setCustomManager({
        ...customManager,
        [nameObject]: datePickerValue,
      });
    }
  };

  const handleOnChangeRadio = (event: RadioChangeEvent) => {
    const radioValue = event.target.value;

    setSave({
      ...save,
      isCustomManager: radioValue === 'default' ? false : true,
      managerName: radioValue === 'default' ? '' : customManager.managerName,
      managerBirthdate: radioValue === 'default' ? '' : customManager.managerBirthdate,
      managerCountryId: radioValue === 'default' ? undefined : customManager.managerCountryId,
    });

    if (radioValue === 'default') {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);

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

    setSelectedRadioOption(radioValue);
  };

  const handleOnChangeCompetitionglobalCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      competitionsglobalCountryId: selectValue,
      competitionglobalId: undefined,
      teamglobalId: undefined,
      ...(selectedRadioOption === 'default' && { managerName: '' }),
      ...(selectedRadioOption === 'default' && { managerBirthdate: '' }),
      ...(selectedRadioOption === 'default' && { managerCountryId: undefined }),
    });

    setSelectedCompetitionglobalId(undefined);
    setSelectedCompetitionsglobalCountryId(selectValue);

    formSave.resetFields(['competitionglobalId', 'teamglobalId']);

    if (selectedRadioOption === 'default') {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);
    }
  };

  const handleOnChangeCompetitionglobalSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      competitionglobalId: selectValue,
      teamglobalId: undefined,
      ...(selectedRadioOption === 'default' && { managerName: '' }),
      ...(selectedRadioOption === 'default' && { managerBirthdate: '' }),
      ...(selectedRadioOption === 'default' && { managerCountryId: undefined }),
    });

    setSelectedCompetitionglobalId(selectValue);

    formSave.resetFields(['teamglobalId']);

    if (selectedRadioOption === 'default') {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);
    }
  };

  const handleOnChangeTeamglobalSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      teamglobalId: selectValue,
      ...(selectedRadioOption === 'default' && { managerName: '' }),
      ...(selectedRadioOption === 'default' && { managerBirthdate: '' }),
      ...(selectedRadioOption === 'default' && { managerCountryId: undefined }),
    });

    if (selectedRadioOption === 'default') {
      if (!selectValue) {
        formSave.setFieldsValue({
          managerName: '',
          managerBirthdate: '',
          managerCountryId: undefined,
        });
      } else {
        const managerglobal = managersglobal.find(
          (managerglobal) => managerglobal.teamglobal?.id === selectValue,
        );

        formSave.setFieldsValue({
          managerName: managerglobal ? managerglobal.name : '',
          managerBirthdate: managerglobal ? dayjs(managerglobal.birthdate) : '',
          managerCountryId:
            managerglobal?.country?.id !== undefined ? `${managerglobal.country.id}` : undefined,
        });
      }
    }
  };

  const handleOnChangeManagerCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      managerCountryId: selectValue,
    });

    setCustomManager({
      ...customManager,
      managerCountryId: selectValue,
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
