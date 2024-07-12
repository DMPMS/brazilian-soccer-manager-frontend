import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_COMPETITIONGLOBAL } from '../../../../shared/constants/dtos';
import {
  COMPETITIONGLOBAL_MAX_LENGH_NAME,
  COMPETITIONGLOBAL_MAX_LENGH_SEASON,
  COMPETITIONGLOBAL_MIN_LENGH_NAME,
  COMPETITIONGLOBAL_MIN_LENGH_SEASON,
} from '../../../../shared/constants/others';
import {
  URL_COMPETITIONGLOBAL,
  URL_COMPETITIONGLOBAL_ID,
  URL_TEAMGLOBAL,
} from '../../../../shared/constants/urls';
import { InsertCompetitionglobalDTO } from '../../../../shared/dtos/InsertCompetitonglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { useCompetitionglobalReducer } from '../../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';
import { useGlobalReducer } from '../../../../store/reducers/globalReducer/useGlobalReducer';
import { useTeamglobalReducer } from '../../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { useRule } from '../../../shared/rule/hooks/useRule';
import { CompetitionglobalRoutesEnum } from '../routes';

export const useInsertCompetitionglobal = (competitionglobalId?: string) => {
  const {
    setCompetitionsglobal,
    competitionglobal: competitionglobalReducer,
    setCompetitionglobal: setCompetitionglobalReducer,
  } = useCompetitionglobalReducer();
  const { setTeamsglobal } = useTeamglobalReducer();
  const { setNotification } = useGlobalReducer();

  const { newRequest, loading } = useNewRequests();
  const navigate = useNavigate();

  const [loadingCompetitionglobal, setLoadingCompetitionglobal] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [competitionglobal, setCompetitionglobal] =
    useState<InsertCompetitionglobalDTO>(DEFAULT_COMPETITIONGLOBAL);

  const [formCompetitionglobal] = useForm();

  const { rules } = useRule();

  const [ruleNumberOfTeams, setRuleNumberOfTeams] = useState<number>(0);
  const [teamglobalIdsCount, setTeamglobalIdsCount] = useState<number>(0);

  useEffect(() => {
    if (competitionglobalId) {
      const findAndSetCompetitionglobalReducer = async (competitionglobalId: string) => {
        await newRequest(
          MethodsEnum.GET,
          URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', competitionglobalId),
        ).then((data) => {
          setCompetitionglobalReducer(data);
        });

        setLoadingCompetitionglobal(false);
      };

      setIsEdit(true);
      findAndSetCompetitionglobalReducer(competitionglobalId);
    } else {
      setIsEdit(false);
      setCompetitionglobalReducer(undefined);
      setLoadingCompetitionglobal(false);
    }
  }, [competitionglobalId]);

  useEffect(() => {
    if (competitionglobalReducer) {
      const teamglobalIds: number[] = [];

      competitionglobalReducer.competitionsglobalTeamglobal?.forEach(
        (competitionglobalTeamglobal) => {
          if (competitionglobalTeamglobal.teamglobal) {
            teamglobalIds.push(competitionglobalTeamglobal.teamglobal.id);
          }
        },
      );

      setCompetitionglobal({
        name: competitionglobalReducer.name,
        season: competitionglobalReducer.season,
        srcImage: competitionglobalReducer.srcImage,
        ruleId: competitionglobalReducer.rule?.id,
        countryId: competitionglobalReducer.country?.id,
        teamglobalIds: teamglobalIds,
      });

      formCompetitionglobal.setFieldsValue({
        name: competitionglobalReducer.name,
        season: competitionglobalReducer.season,
        srcImage: competitionglobalReducer.srcImage,
        ruleId:
          competitionglobalReducer.rule?.id !== undefined
            ? `${competitionglobalReducer.rule.id}`
            : undefined,
        countryId:
          competitionglobalReducer.country?.id !== undefined
            ? `${competitionglobalReducer.country.id}`
            : undefined,
        teamglobalIds:
          teamglobalIds.length !== 0
            ? teamglobalIds.map((teamglobalId) => `${teamglobalId}`)
            : undefined,
      });

      setRuleNumberOfTeams(competitionglobalReducer.rule?.numberOfTeams || 0);
      setTeamglobalIdsCount(teamglobalIds.length);
    } else {
      setCompetitionglobal(DEFAULT_COMPETITIONGLOBAL);
      formCompetitionglobal.resetFields();
      setRuleNumberOfTeams(0);
      setTeamglobalIdsCount(0);
    }
  }, [competitionglobalReducer]);

  useEffect(() => {
    if (
      competitionglobal.name.length >= COMPETITIONGLOBAL_MIN_LENGH_NAME &&
      competitionglobal.name.length <= COMPETITIONGLOBAL_MAX_LENGH_NAME &&
      competitionglobal.season.length >= COMPETITIONGLOBAL_MIN_LENGH_SEASON &&
      competitionglobal.season.length <= COMPETITIONGLOBAL_MAX_LENGH_SEASON &&
      competitionglobal.srcImage &&
      competitionglobal.ruleId &&
      competitionglobal.countryId &&
      competitionglobal.teamglobalIds.length === ruleNumberOfTeams
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [competitionglobal]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setCompetitionglobal({
      ...competitionglobal,
      [nameObject]: event.target.value,
    });
  };

  const handleOnChangeRuleSelect = (value: string) => {
    if (value) {
      const selectedRuleId = Number(value);

      setCompetitionglobal({
        ...competitionglobal,
        ruleId: selectedRuleId,
      });

      const selectedRule = rules.find((rule) => rule.id === selectedRuleId);
      if (selectedRule) {
        setRuleNumberOfTeams(selectedRule.numberOfTeams);
      }
    } else {
      setCompetitionglobal({
        ...competitionglobal,
        ruleId: undefined,
        teamglobalIds: [],
      });
      setRuleNumberOfTeams(0);
      setTeamglobalIdsCount(0);

      formCompetitionglobal.resetFields(['teamglobalIds']);
    }
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setCompetitionglobal({
      ...competitionglobal,
      countryId: value ? Number(value) : undefined,
    });
  };

  const handleOnChangeTeamglobalSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setTeamglobalIdsCount(updatedValues.length);

    setCompetitionglobal({
      ...competitionglobal,
      teamglobalIds: updatedValues,
    });
  };

  const handleOnClickInsert = async () => {
    if (competitionglobalId) {
      await newRequest(
        MethodsEnum.PUT,
        URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', competitionglobalId),
        false,
        {},
        competitionglobal,
      );
    } else {
      await newRequest(MethodsEnum.POST, URL_COMPETITIONGLOBAL, false, {}, competitionglobal);
    }

    await newRequest(MethodsEnum.GET, URL_COMPETITIONGLOBAL).then((data) => {
      setCompetitionsglobal(data);
    });

    await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL).then((data) => {
      setTeamsglobal(data);
    });

    if (competitionglobalId) {
      setNotification('Competição editada.', 'success');
    } else {
      setNotification('Competição inserida.', 'success');
    }

    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  const handleOnClickReset = () => {
    setCompetitionglobal(DEFAULT_COMPETITIONGLOBAL);
    formCompetitionglobal.resetFields();
    setRuleNumberOfTeams(0);
    setTeamglobalIdsCount(0);
  };

  const handleOnClickCancel = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  return {
    loading,
    disabledButton,
    isEdit,
    loadingCompetitionglobal,
    formCompetitionglobal,
    ruleNumberOfTeams,
    teamglobalIdsCount,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
    handleOnChangeTeamglobalSelect,
  };
};
