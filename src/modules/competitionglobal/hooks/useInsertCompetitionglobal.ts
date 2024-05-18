import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_COMPETITIONGLOBAL } from '../../../shared/constants/urls';
import { InsertCompetitionglobalDTO } from '../../../shared/dtos/InsertCompetitonglobal.dto';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCompetitionglobalReducer } from '../../../store/reducers/competitionglobalReducer/useCompetitionglobalReducer';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { useRule } from '../../rule/hooks/useRule';
import { CompetitionglobalRoutesEnum } from '../routes';

export const useInsertCompetitionglobal = () => {
  const navigate = useNavigate();

  const { request } = useRequests();
  const { setCompetitionsglobal } = useCompetitionglobalReducer();
  const { setNotification } = useGlobalReducer();

  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [competitionglobal, setCompetitionglobal] = useState<InsertCompetitionglobalDTO>({
    name: '',
    season: '',
    srcImage: '',
  });

  const { rules } = useRule();

  const [ruleNumberOfTeams, setRuleNumberOfTeams] = useState<number>(0);
  const [selectedTeamglobalIds, setSelectedTeamglobalIds] = useState<number[]>([]);

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
    setLoading(true);

    await request(URL_COMPETITIONGLOBAL, MethodsEnum.POST, undefined, competitionglobal).then(
      () => {
        setNotification('Sucesso!', 'success', 'Competição inserida com sucesso!');
      },
    );

    await request(URL_COMPETITIONGLOBAL, MethodsEnum.GET, setCompetitionsglobal);

    setLoading(false);

    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL);
  };

  return {
    competitionglobal,
    loading,
    disabledButton,
    ruleNumberOfTeams,
    selectedTeamglobalIds,
    handleOnChangeInput,
    handleOnClickInsert,
    handleOnChangeCountrySelect,
    handleOnChangeRuleSelect,
    handleOnChangeTeamglobalSelect,
  };
};
