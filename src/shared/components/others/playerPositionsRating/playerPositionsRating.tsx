import {
  PLAYERGLOBAL_DEFAULT_GOALKEEPER_POSITION_RATING,
  PLAYERGLOBAL_MAX_OVERALL,
  PLAYERGLOBAL_MIN_OVERALL,
  PLAYERGLOBAL_NON_PLAYING_POSITION_RATING,
  PLAYERGLOBAL_PRIMARY_POSITION_RATING,
  PLAYERGLOBAL_SAME_AREA_PRIMARY_POSITION_RATING,
  PLAYERGLOBAL_SAME_AREA_SECONDARY_POSITION_RATING,
  PLAYERGLOBAL_SECONDARY_POSITION_RATING,
} from '../../../constants/others';
import FlexProject from '../../flex/FlexProject';

interface PlayerPositionsRatingProps {
  playerOverall: number;
  primaryPositionIds: number[];
  secondaryPositionIds: number[];
}

const positionAreaById: { [key: number]: string } = {
  1: 'Ataque',
  2: 'Ataque',
  3: 'Ataque',
  4: 'Ataque',
  5: 'Meio-Campo',
  6: 'Meio-Campo',
  7: 'Meio-Campo',
  8: 'Meio-Campo',
  9: 'Meio-Campo',
  10: 'Defesa',
  11: 'Defesa',
  12: 'Defesa',
  13: 'Goleiro',
};

const positionIds = {
  CA: 1,
  SA: 2,
  PE: 3,
  PD: 4,
  MO: 5,
  ME: 6,
  MD: 7,
  MC: 8,
  VOL: 9,
  LE: 10,
  LD: 11,
  ZAG: 12,
  GOL: 13,
};

const calculateOverall = (
  positionId: number,
  playerOverall: number,
  primaryPositionIds: number[],
  secondaryPositionIds: number[],
) => {
  if (playerOverall < PLAYERGLOBAL_MIN_OVERALL || playerOverall > PLAYERGLOBAL_MAX_OVERALL) {
    return { overall: '?', colorIndex: 5 };
  }

  if (primaryPositionIds.includes(positionId)) {
    return { overall: playerOverall * PLAYERGLOBAL_PRIMARY_POSITION_RATING, colorIndex: 0 };
  }

  if (secondaryPositionIds.includes(positionId)) {
    return {
      overall: Math.ceil(playerOverall * PLAYERGLOBAL_SECONDARY_POSITION_RATING),
      colorIndex: 1,
    };
  }

  const positionArea = positionAreaById[positionId];

  const primaryAreaMatch = primaryPositionIds.some((id) => positionAreaById[id] === positionArea);
  if (primaryAreaMatch) {
    return {
      overall: Math.ceil(playerOverall * PLAYERGLOBAL_SAME_AREA_PRIMARY_POSITION_RATING),
      colorIndex: 2,
    };
  }

  const secondaryAreaMatch = secondaryPositionIds.some(
    (id) => positionAreaById[id] === positionArea,
  );
  if (secondaryAreaMatch) {
    return {
      overall: Math.ceil(playerOverall * PLAYERGLOBAL_SAME_AREA_SECONDARY_POSITION_RATING),
      colorIndex: 3,
    };
  }

  if (positionId === positionIds.GOL) {
    return { overall: PLAYERGLOBAL_DEFAULT_GOALKEEPER_POSITION_RATING, colorIndex: 5 };
  }

  return {
    overall: Math.ceil(playerOverall * PLAYERGLOBAL_NON_PLAYING_POSITION_RATING),
    colorIndex: 4,
  };
};

const PlayerPositionsRating = ({
  playerOverall,
  primaryPositionIds,
  secondaryPositionIds,
}: PlayerPositionsRatingProps) => {
  const positionOveralls = {
    CA: calculateOverall(positionIds.CA, playerOverall, primaryPositionIds, secondaryPositionIds),
    SA: calculateOverall(positionIds.SA, playerOverall, primaryPositionIds, secondaryPositionIds),
    PE: calculateOverall(positionIds.PE, playerOverall, primaryPositionIds, secondaryPositionIds),
    PD: calculateOverall(positionIds.PD, playerOverall, primaryPositionIds, secondaryPositionIds),
    MO: calculateOverall(positionIds.MO, playerOverall, primaryPositionIds, secondaryPositionIds),
    ME: calculateOverall(positionIds.ME, playerOverall, primaryPositionIds, secondaryPositionIds),
    MD: calculateOverall(positionIds.MD, playerOverall, primaryPositionIds, secondaryPositionIds),
    MC: calculateOverall(positionIds.MC, playerOverall, primaryPositionIds, secondaryPositionIds),
    VOL: calculateOverall(positionIds.VOL, playerOverall, primaryPositionIds, secondaryPositionIds),
    LE: calculateOverall(positionIds.LE, playerOverall, primaryPositionIds, secondaryPositionIds),
    LD: calculateOverall(positionIds.LD, playerOverall, primaryPositionIds, secondaryPositionIds),
    ZAG: calculateOverall(positionIds.ZAG, playerOverall, primaryPositionIds, secondaryPositionIds),
    GOL: calculateOverall(positionIds.GOL, playerOverall, primaryPositionIds, secondaryPositionIds),
  };

  const positionsColors = {
    ataque: ['#FF4830', '#FF5e47', '#FF7063', '#D65D51', '#AB4D44', '#636363'],
    meiocampo: ['#30FF30', '#47FF4A', '#66FF63', '#55D651', '#46AB44', '#636363'],
    defesa: ['#303AFF', '#475CFF', '#6373FF', '#515CD6', '#444DAB', '#636363'],
    goleiro: ['#FFBD30', '#FFBF47', '#636363', '#636363', '#636363', '#636363'],
  };

  return (
    <div>
      <FlexProject justify="space-between" align="center">
        <FlexProject
          justify="center"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 100,
            backgroundColor: positionsColors.ataque[positionOveralls.PE.colorIndex],
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
            borderTop: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.PE.overall}</div>
          <div>PE</div>
        </FlexProject>
        <FlexProject
          justify="space-between"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 100,
          }}
        >
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.ataque[positionOveralls.CA.colorIndex],
              border: '1px solid #000000',
              borderTop: '2px solid #000000',
            }}
          >
            <div>{positionOveralls.CA.overall}</div>
            <div>CA</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.ataque[positionOveralls.SA.colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.SA.overall}</div>
            <div>SA</div>
          </FlexProject>
        </FlexProject>
        <FlexProject
          justify="center"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 100,
            backgroundColor: positionsColors.ataque[positionOveralls.PD.colorIndex],
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
            borderTop: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.PD.overall}</div>
          <div>PD</div>
        </FlexProject>
      </FlexProject>

      <FlexProject justify="space-between" align="center">
        <FlexProject
          justify="center"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 150,
            backgroundColor: positionsColors.meiocampo[positionOveralls.ME.colorIndex],
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.ME.overall}</div>
          <div>ME</div>
        </FlexProject>
        <FlexProject
          justify="space-between"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 150,
          }}
        >
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.meiocampo[positionOveralls.MO.colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.MO.overall}</div>
            <div>MO</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.meiocampo[positionOveralls.MC.colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.MC.overall}</div>
            <div>MC</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.meiocampo[positionOveralls.VOL.colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.VOL.overall}</div>
            <div>VOL</div>
          </FlexProject>
        </FlexProject>
        <FlexProject
          justify="center"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 150,
            backgroundColor: positionsColors.meiocampo[positionOveralls.MD.colorIndex],
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.MD.overall}</div>
          <div>MD</div>
        </FlexProject>
      </FlexProject>

      <FlexProject justify="space-between" align="center">
        <FlexProject
          justify="center"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 100,
            backgroundColor: positionsColors.defesa[positionOveralls.LE.colorIndex],
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.LE.overall}</div>
          <div>LE</div>
        </FlexProject>
        <FlexProject
          justify="space-between"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 100,
          }}
        >
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.defesa[positionOveralls.ZAG.colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.ZAG.overall}</div>
            <div>ZAG</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.goleiro[positionOveralls.GOL.colorIndex],
              border: '1px solid #000000',
              borderBottom: '2px solid #000000',
            }}
          >
            <div>{positionOveralls.GOL.overall}</div>
            <div>GOL</div>
          </FlexProject>
        </FlexProject>
        <FlexProject
          justify="center"
          align="center"
          vertical
          style={{
            width: '100%',
            height: 100,
            backgroundColor: positionsColors.defesa[positionOveralls.LD.colorIndex],
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.LD.overall}</div>
          <div>LD</div>
        </FlexProject>
      </FlexProject>
    </div>
  );
};

export default PlayerPositionsRating;
