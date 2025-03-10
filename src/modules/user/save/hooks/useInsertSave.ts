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
import { InsertSaveDTO } from '../../../../shared/dtos/insertSave.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { SaveType } from '../../../../shared/types/Save.type';
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

  const [competitionsglobalDistinctRuleCountryIds, setCompetitionsglobalDistinctRuleCountryIds] =
    useState<number[]>([]);
  const [competitionsglobalRuleCountryId, setCompetitionsglobalRuleCountryId] = useState<
    number | undefined
  >(undefined);
  const [competitionglobalId, setCompetitionglobalId] = useState<number | undefined>(undefined);

  const [radioOptionIsDefault, setRadioOptionIsDefault] = useState<boolean>(true);
  const [userSaveNames, setUserSaveNames] = useState<string[]>([]);
  const [customManager, setCustomManager] = useState<CustomManagerDTO>(DEFAULT_CUSTOMMANAGER);

  useEffect(() => {
    setCompetitionsglobalDistinctRuleCountryIds([
      ...new Set(
        competitionsglobal.map((competitionglobal) => competitionglobal.rule!.country!.id),
      ),
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
      save.competitionsglobalRuleCountryId &&
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

    const isDefaultRadioOption = radioValue === 'default';

    setSave({
      ...save,
      isCustomManager: isDefaultRadioOption ? false : true,
      managerName: isDefaultRadioOption ? '' : customManager.managerName,
      managerBirthdate: isDefaultRadioOption ? '' : customManager.managerBirthdate,
      managerCountryId: isDefaultRadioOption ? undefined : customManager.managerCountryId,
    });

    if (isDefaultRadioOption) {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);

      const managerglobal = managersglobal.find(
        (managerglobal) =>
          managerglobal.teamglobal?.id === save.teamglobalId &&
          managerglobal.teamglobal !== undefined,
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

    setRadioOptionIsDefault(isDefaultRadioOption);
  };

  const handleOnChangeCompetitionglobalCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      competitionsglobalRuleCountryId: selectValue,
      competitionglobalId: undefined,
      teamglobalId: undefined,
      ...(radioOptionIsDefault && { managerName: '' }),
      ...(radioOptionIsDefault && { managerBirthdate: '' }),
      ...(radioOptionIsDefault && { managerCountryId: undefined }),
    });

    setCompetitionglobalId(undefined);
    setCompetitionsglobalRuleCountryId(selectValue);

    formSave.resetFields(['competitionglobalId', 'teamglobalId']);

    if (radioOptionIsDefault) {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);
    }
  };

  const handleOnChangeCompetitionglobalSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      competitionglobalId: selectValue,
      teamglobalId: undefined,
      ...(radioOptionIsDefault && { managerName: '' }),
      ...(radioOptionIsDefault && { managerBirthdate: '' }),
      ...(radioOptionIsDefault && { managerCountryId: undefined }),
    });

    setCompetitionglobalId(selectValue);

    formSave.resetFields(['teamglobalId']);

    if (radioOptionIsDefault) {
      formSave.resetFields(['managerName', 'managerBirthdate', 'managerCountryId']);
    }
  };

  const handleOnChangeTeamglobalSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setSave({
      ...save,
      teamglobalId: selectValue,
      ...(radioOptionIsDefault && { managerName: '' }),
      ...(radioOptionIsDefault && { managerBirthdate: '' }),
      ...(radioOptionIsDefault && { managerCountryId: undefined }),
    });

    if (radioOptionIsDefault) {
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

  const handleOnInsert = async () => {
    const adjustedSave: InsertSaveDTO = {
      ...save,
      ...(save.managerName === '' && { managerName: undefined }),
      ...(save.managerBirthdate === '' && { managerBirthdate: undefined }),
    };

    await newRequest(MethodsEnum.POST, URL_SAVE, false, {}, adjustedSave);

    await newRequest(MethodsEnum.GET, URL_SAVE).then((data: SaveType[]) => {
      setSaves(data);
    });

    setNotification('Save criado.', 'success');

    navigate(SaveRoutesEnum.SAVE);
  };

  const handleOnReset = () => {
    setSave(DEFAULT_SAVE);
    setCustomManager({
      managerName: user?.name || '',
      managerBirthdate: user?.birthdate || '',
      managerCountryId: user?.country?.id,
    });
    formSave.resetFields();

    setCompetitionsglobalDistinctRuleCountryIds([]);
    setCompetitionsglobalRuleCountryId(undefined);
    setCompetitionglobalId(undefined);
    setRadioOptionIsDefault(true);
  };

  const handleOnCancel = () => {
    navigate(SaveRoutesEnum.SAVE);
  };

  return {
    loading,
    disabledButton,
    formSave,
    competitionsglobalDistinctRuleCountryIds,
    competitionsglobalRuleCountryId,
    competitionglobalId,
    radioOptionIsDefault,
    userSaveNames,
    handleOnChangeInput,
    handleOnChangeDatePicker,
    handleOnChangeRadio,
    handleOnChangeCompetitionglobalCountrySelect,
    handleOnChangeCompetitionglobalSelect,
    handleOnChangeTeamglobalSelect,
    handleOnInsert,
    handleOnReset,
    handleOnCancel,
    handleOnChangeManagerCountrySelect,
  };
};
