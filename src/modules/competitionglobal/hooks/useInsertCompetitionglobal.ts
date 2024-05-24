import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  URL_COMPETITIONGLOBAL,
  URL_COMPETITIONGLOBAL_ID,
  URL_TEAMGLOBAL,
} from '../../../shared/constants/urls';
import { InsertCompetitionglobalDTO } from '../../../shared/dtos/InsertCompetitonglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCompetitionglobalReducer } from '../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';
import { useTeamglobalReducer } from '../../../store/reducers/teamglobalReducer/useTeamglobalReducer';
import { useRule } from '../../rule/hooks/useRule';
import { CompetitionglobalRoutesEnum } from '../routes';

const DEFAULT_COMPETITIONGLOBAL = {
  name: '',
  season: '',
  srcImage: '',
};

export const useInsertCompetitionglobal = (competitionglobalId?: string) => {
  const navigate = useNavigate();

  const [loadingCompetitionglobal, setLoadingCompetitionglobal] = useState(false);
  const { request, loading } = useRequests();
  const {
    setCompetitionsglobal,
    competitionglobal: competitionglobalReducer,
    setCompetitionglobal: setCompetitionglobalReducer,
  } = useCompetitionglobalReducer();
  const { setTeamsglobal } = useTeamglobalReducer();

  const [disabledButton, setDisabledButton] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [competitionglobal, setCompetitionglobal] =
    useState<InsertCompetitionglobalDTO>(DEFAULT_COMPETITIONGLOBAL);

  const { rules } = useRule();

  const [ruleNumberOfTeams, setRuleNumberOfTeams] = useState<number>(0);
  const [selectedTeamglobalIds, setSelectedTeamglobalIds] = useState<number[]>([]);

  useEffect(() => {
    if (competitionglobalId) {
      const findAndSetCompetitionglobalReducer = async (competitionglobalId: string) => {
        setLoadingCompetitionglobal(true);
        await request(
          URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', competitionglobalId),
          MethodsEnum.GET,
          setCompetitionglobalReducer,
        );
        setLoadingCompetitionglobal(false);
      };

      setIsEdit(true);
      findAndSetCompetitionglobalReducer(competitionglobalId);
    } else {
      setIsEdit(false);
      setCompetitionglobalReducer(undefined);
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

      setRuleNumberOfTeams(competitionglobalReducer.rule?.numberOfTeams || 0);
      setSelectedTeamglobalIds(teamglobalIds);
    } else {
      setCompetitionglobal(DEFAULT_COMPETITIONGLOBAL);
      setRuleNumberOfTeams(0);
      setSelectedTeamglobalIds([]);
    }
  }, [competitionglobalReducer]);

  useEffect(() => {
    if (
      competitionglobal.name &&
      competitionglobal.season &&
      competitionglobal.srcImage &&
      competitionglobal.ruleId &&
      competitionglobal.countryId &&
      competitionglobal.teamglobalIds?.length === ruleNumberOfTeams
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
    const selectedRuleId = Number(value);

    setCompetitionglobal({
      ...competitionglobal,
      ruleId: selectedRuleId,
    });

    const selectedRule = rules.find((rule) => rule.id === selectedRuleId);
    if (selectedRule) {
      setRuleNumberOfTeams(selectedRule.numberOfTeams);
    }
  };

  const handleOnChangeCountrySelect = (value: string) => {
    setCompetitionglobal({
      ...competitionglobal,
      countryId: Number(value),
    });
  };

  const handleOnChangeTeamglobalSelect = (values: string[]) => {
    const updatedValues = values.map((value) => Number(value));

    setSelectedTeamglobalIds(updatedValues);

    setCompetitionglobal({
      ...competitionglobal,
      teamglobalIds: updatedValues,
    });
  };

  const handleOnClickInsert = async () => {
    if (competitionglobalId) {
      await request(
        URL_COMPETITIONGLOBAL_ID.replace('{competitionglobalId}', competitionglobalId),
        MethodsEnum.PUT,
        undefined,
        competitionglobal,
        'Competição editada com sucesso!',
      );
    } else {
      await request(
        URL_COMPETITIONGLOBAL,
        MethodsEnum.POST,
        undefined,
        competitionglobal,
        'Competição inserida com sucesso!',
      );
    }

    await request(URL_COMPETITIONGLOBAL, MethodsEnum.GET, setCompetitionsglobal);

    await request(URL_TEAMGLOBAL, MethodsEnum.GET, setTeamsglobal);

    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  return {
    competitionglobal,
    loading,
    disabledButton,
    isEdit,
    loadingCompetitionglobal,
    ruleNumberOfTeams,
    selectedTeamglobalIds,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
    handleOnChangeTeamglobalSelect,
  };
};
