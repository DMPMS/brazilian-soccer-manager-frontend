import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { optionsPositionsByFormationMap } from '../../../../shared/components/selects/formationSelect/FormationSelectProject';
import { DEFAULT_FORMATION_ID } from '../../../../shared/constants/dtos';
import { PlayMatchDTO } from '../../../../shared/dtos/playMatch.dto';
import { PlayersaveType } from '../../../../shared/types/Playersave.type';
import { PositionType } from '../../../../shared/types/Position.type';
import { useSavePlayReducer } from '../../../../store/reducers/savePlayReducer/useSavePlayReducer';
import { usePosition } from '../../../shared/position/hooks/usePosition';
import { SavePlayRoutesEnum } from '../routes';

export const useSavePlayPlayMatch = () => {
  const { savePlayPlayMatch } = useSavePlayReducer();

  const navigate = useNavigate();

  const { positions } = usePosition();

  const [playMatch, setPlayMatch] = useState<PlayMatchDTO>();

  const [
    teamsaveHomeSquadplansavePositionsAndPlayerssave,
    setTeamsaveHomeSquadplansavePositionsAndPlayerssave,
  ] = useState<{
    [key: string]: { position: PositionType | undefined; playersave: PlayersaveType | undefined };
  }>({});

  const [
    teamsaveAwaySquadplansavePositionsAndPlayerssave,
    setTeamsaveAwaySquadplansavePositionsAndPlayerssave,
  ] = useState<{
    [key: string]: { position: PositionType | undefined; playersave: PlayersaveType | undefined };
  }>({});

  useEffect(() => {
    if (savePlayPlayMatch) {
      const teamsaveHomePlayerssave = savePlayPlayMatch.teamsaveHome?.playerssave;
      const teamsaveHomeSquadplansave = savePlayPlayMatch.teamsaveHome?.squadplansave;
      const teamsaveAwayPlayerssave = savePlayPlayMatch.teamsaveAway?.playerssave;
      const teamsaveAwaySquadplansave = savePlayPlayMatch.teamsaveAway?.squadplansave;

      const teamsaveHomeformationOptionPositions =
        optionsPositionsByFormationMap[
          teamsaveHomeSquadplansave?.formation?.id || DEFAULT_FORMATION_ID
        ];

      const teamsaveAwayformationOptionPositions =
        optionsPositionsByFormationMap[
          teamsaveAwaySquadplansave?.formation?.id || DEFAULT_FORMATION_ID
        ];

      const objTeamsaveHomeSquadplansavePositionsAndPlayerssave = Object.fromEntries(
        teamsaveHomeformationOptionPositions.map((optionPosition, index) => [
          index,
          {
            position: positions.find((position) => position.id === optionPosition.positionId),
            playersave: teamsaveHomePlayerssave?.find(
              (teamsaveHomePlayersave) =>
                teamsaveHomePlayersave.id === teamsaveHomeSquadplansave?.playersaveIds[index],
            ),
          },
        ]),
      );

      const objTeamsaveAwaySquadplansavePositionsAndPlayerssave = Object.fromEntries(
        teamsaveAwayformationOptionPositions.map((optionPosition, index) => [
          index,
          {
            position: positions.find((position) => position.id === optionPosition.positionId),
            playersave: teamsaveAwayPlayerssave?.find(
              (teamsaveAwayPlayersave) =>
                teamsaveAwayPlayersave.id === teamsaveAwaySquadplansave?.playersaveIds[index],
            ),
          },
        ]),
      );

      setTeamsaveHomeSquadplansavePositionsAndPlayerssave(
        objTeamsaveHomeSquadplansavePositionsAndPlayerssave,
      );
      setTeamsaveAwaySquadplansavePositionsAndPlayerssave(
        objTeamsaveAwaySquadplansavePositionsAndPlayerssave,
      );

      setPlayMatch({
        teamsaveHomeGoals: 0,
        teamsaveHome: savePlayPlayMatch.teamsaveHome,
        teamsaveHomePlayerssave: teamsaveHomePlayerssave,
        teamsaveHomeSquadplansave: teamsaveHomeSquadplansave,

        teamsaveAwayGoals: 0,
        teamsaveAway: savePlayPlayMatch.teamsaveAway,
        teamsaveAwayPlayerssave: teamsaveAwayPlayerssave,
        teamsaveAwaySquadplansave: teamsaveAwaySquadplansave,
      });
    } else {
      navigate(SavePlayRoutesEnum.SAVE_PLAY_COMPETITION);
    }
  }, []);

  return {
    savePlayPlayMatch,
    playMatch,
    teamsaveHomeSquadplansavePositionsAndPlayerssave,
    teamsaveAwaySquadplansavePositionsAndPlayerssave,
  };
};
