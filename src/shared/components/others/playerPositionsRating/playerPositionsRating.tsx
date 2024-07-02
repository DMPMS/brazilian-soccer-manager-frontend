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
    return '?';
  }

  if (primaryPositionIds.includes(positionId)) {
    return playerOverall * PLAYERGLOBAL_PRIMARY_POSITION_RATING;
  }

  if (secondaryPositionIds.includes(positionId)) {
    return Math.ceil(playerOverall * PLAYERGLOBAL_SECONDARY_POSITION_RATING);
  }

  const positionArea = positionAreaById[positionId];

  const primaryAreaMatch = primaryPositionIds.some((id) => positionAreaById[id] === positionArea);
  if (primaryAreaMatch) {
    return Math.ceil(playerOverall * PLAYERGLOBAL_SAME_AREA_PRIMARY_POSITION_RATING);
  }

  const secondaryAreaMatch = secondaryPositionIds.some(
    (id) => positionAreaById[id] === positionArea,
  );
  if (secondaryAreaMatch) {
    return Math.ceil(playerOverall * PLAYERGLOBAL_SAME_AREA_SECONDARY_POSITION_RATING);
  }

  if (positionId === positionIds.GOL) {
    return PLAYERGLOBAL_DEFAULT_GOALKEEPER_POSITION_RATING;
  }

  return Math.ceil(playerOverall * PLAYERGLOBAL_NON_PLAYING_POSITION_RATING);
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
            backgroundColor: '#F28B82',
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
            borderTop: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.PE}</div>
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
              backgroundColor: '#F28B82',
              border: '1px solid #000000',
              borderTop: '2px solid #000000',
            }}
          >
            <div>{positionOveralls.CA}</div>
            <div>CA</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#F28B82',
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.SA}</div>
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
            backgroundColor: '#F28B82',
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
            borderTop: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.PD}</div>
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
            backgroundColor: '#CCFF90',
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.ME}</div>
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
              backgroundColor: '#CCFF90',
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.MO}</div>
            <div>MO</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#CCFF90',
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.MC}</div>
            <div>MC</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#CCFF90',
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.VOL}</div>
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
            backgroundColor: '#CCFF90',
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.MD}</div>
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
            backgroundColor: '#AECBFA',
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.LE}</div>
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
              backgroundColor: '#AECBFA',
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls.ZAG}</div>
            <div>ZAG</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#FFAB40',
              border: '1px solid #000000',
              borderBottom: '2px solid #000000',
            }}
          >
            <div>{positionOveralls.GOL}</div>
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
            backgroundColor: '#AECBFA',
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <div>{positionOveralls.LD}</div>
          <div>LD</div>
        </FlexProject>
      </FlexProject>
    </div>
  );
};

export default PlayerPositionsRating;
