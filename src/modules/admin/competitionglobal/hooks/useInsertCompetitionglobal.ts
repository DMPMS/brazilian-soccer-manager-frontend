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
import { InsertCompetitionglobalDTO } from '../../../../shared/dtos/insertCompetitonglobal.dto';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { RuleCompetitionTypeEnum } from '../../../../shared/enums/RuleCompetitionType.enum';
import { validateImage } from '../../../../shared/functions/validateImage';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { TeamglobalType } from '../../../../shared/types/Teamglobal.type';
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

  const [isValidImage, setIsValidImage] = useState<boolean>(false); // It's on top
  const [srcImage, setSrcImage] = useState<string>('');
  const [ruleNumberOfTeams, setRuleNumberOfTeams] = useState<number>(0);
  const [ruleCompetitionType, setRuleCompetitionType] = useState<
    RuleCompetitionTypeEnum | undefined
  >(undefined);
  const [teamglobalIdsCount, setTeamglobalIdsCount] = useState<number>(0);

  const [teamglobalOfCompetitionglobalReducerIds, setTeamglobalOfCompetitionglobalReducerIds] =
    useState<number[]>([]);

  const [
    teamglobalWithoutCompetitionglobalRuleTypeLeagueIds,
    setTeamglobalWithoutCompetitionglobalRuleTypeLeagueIds,
  ] = useState<number[]>([]);

  const [
    teamglobalWithoutCompetitionglobalRuleTypeCupIds,
    setTeamglobalWithoutCompetitionglobalRuleTypeCupIds,
  ] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL, false, {
        isWithoutCompetitionglobalRuleTypeLeague: true,
      }).then((data) => {
        const teamglobalIds = data.map((teamglobal: TeamglobalType) => teamglobal.id);
        setTeamglobalWithoutCompetitionglobalRuleTypeLeagueIds(teamglobalIds);
      });

      await newRequest(MethodsEnum.GET, URL_TEAMGLOBAL, false, {
        isWithoutCompetitionglobalRuleTypeCup: true,
      }).then((data) => {
        const teamglobalIds = data.map((teamglobal: TeamglobalType) => teamglobal.id);
        setTeamglobalWithoutCompetitionglobalRuleTypeCupIds(teamglobalIds);
      });

      if (competitionglobalId) {
        await newRequest(
          MethodsEnum.GET,
          URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', competitionglobalId),
        ).then((data) => {
          setCompetitionglobalReducer(data);
        });

        setIsEdit(true);
        setLoadingCompetitionglobal(false);
      } else {
        setIsEdit(false);
        setCompetitionglobalReducer(undefined);
        setLoadingCompetitionglobal(false);
      }
    };

    fetchData();
  }, [competitionglobalId]);

  useEffect(() => {
    const fetchData = async () => {
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

        setIsValidImage((await validateImage(competitionglobalReducer.srcImage)) ? true : false);
        setSrcImage(competitionglobalReducer.srcImage);

        setRuleNumberOfTeams(competitionglobalReducer.rule?.numberOfTeams || 0);
        setRuleCompetitionType(competitionglobalReducer.rule?.competitionType);
        setTeamglobalIdsCount(teamglobalIds.length);

        setTeamglobalOfCompetitionglobalReducerIds(
          (competitionglobalReducer.competitionsglobalTeamglobal || [])
            .map((item) => item.teamglobal?.id)
            .filter((teamglobal): teamglobal is number => teamglobal !== undefined),
        );
      } else {
        setCompetitionglobal(DEFAULT_COMPETITIONGLOBAL);
        formCompetitionglobal.resetFields();
        setIsValidImage(false);
        setSrcImage('');
        setRuleNumberOfTeams(0);
        setRuleCompetitionType(undefined);
        setTeamglobalIdsCount(0);
        setTeamglobalOfCompetitionglobalReducerIds([]);
      }
    };

    fetchData();
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
      competitionglobal.teamglobalIds.length === ruleNumberOfTeams &&
      isValidImage
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [competitionglobal, ruleNumberOfTeams, isValidImage]);

  const handleOnChangeInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
    nameObject: string,
  ) => {
    const inputValue = event.target.value;

    setCompetitionglobal({
      ...competitionglobal,
      [nameObject]: inputValue,
    });

    if (nameObject === 'srcImage') {
      setIsValidImage((await validateImage(inputValue)) ? true : false);
      setSrcImage(inputValue);
    }
  };

  const handleOnChangeRuleSelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    if (selectValue) {
      const selectedRule = rules.find((rule) => rule.id === selectValue);

      if (selectedRule) {
        setRuleNumberOfTeams(selectedRule.numberOfTeams);
        setRuleCompetitionType(selectedRule.competitionType);

        formCompetitionglobal.setFieldsValue({
          name: selectedRule.default_competition_name,
          srcImage: selectedRule.default_competition_src_image,
        });

        setCompetitionglobal({
          ...competitionglobal,
          ruleId: selectValue,
          name: selectedRule.default_competition_name,
          srcImage: selectedRule.default_competition_src_image,
          teamglobalIds: [],
        });
      }
    } else {
      setRuleNumberOfTeams(0);
      setRuleCompetitionType(undefined);

      setCompetitionglobal({
        ...competitionglobal,
        ruleId: selectValue,
        teamglobalIds: [],
      });
    }

    setTeamglobalIdsCount(0);
    formCompetitionglobal.resetFields(['teamglobalIds']);
  };

  const handleOnChangeCountrySelect = (value: string) => {
    const selectValue = value ? Number(value) : undefined;

    setCompetitionglobal({
      ...competitionglobal,
      countryId: selectValue,
    });
  };

  const handleOnChangeTeamglobalSelect = (values: string[]) => {
    const selectValues = values.map((value) => Number(value));

    setTeamglobalIdsCount(selectValues.length);

    setCompetitionglobal({
      ...competitionglobal,
      teamglobalIds: selectValues,
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
    setIsValidImage(false);
    setSrcImage('');
    setRuleNumberOfTeams(0);
    setRuleCompetitionType(undefined);
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
    isValidImage,
    srcImage,
    ruleNumberOfTeams,
    ruleCompetitionType,
    teamglobalIdsCount,
    teamglobalOfCompetitionglobalReducerIds,
    teamglobalWithoutCompetitionglobalRuleTypeLeagueIds,
    teamglobalWithoutCompetitionglobalRuleTypeCupIds,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnClickReset,
    handleOnClickCancel,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
    handleOnChangeTeamglobalSelect,
  };
};
