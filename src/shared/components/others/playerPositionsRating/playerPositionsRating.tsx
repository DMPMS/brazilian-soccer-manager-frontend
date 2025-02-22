import { PLAYERGLOBAL_MAX_OVERALL, PLAYERGLOBAL_MIN_OVERALL } from '../../../constants/others';
import { PositionEnum } from '../../../enums/Position.enum';
import { PositionAreaEnum } from '../../../enums/PositionArea.enum';
import { PositionRatingEnum } from '../../../enums/PositionRating.enum';
import FlexProject from '../../flex/FlexProject';

interface PlayerPositionsRatingProps {
  playerOverall: number;
  primaryPositionIds: PositionEnum[];
  secondaryPositionIds: PositionEnum[];
}

const positionAreaByPositionId: { [key: number]: PositionAreaEnum } = {
  1: PositionAreaEnum.Attack,
  2: PositionAreaEnum.Attack,
  3: PositionAreaEnum.Attack,
  4: PositionAreaEnum.Attack,
  5: PositionAreaEnum.Midfield,
  6: PositionAreaEnum.Midfield,
  7: PositionAreaEnum.Midfield,
  8: PositionAreaEnum.Midfield,
  9: PositionAreaEnum.Midfield,
  10: PositionAreaEnum.Defense,
  11: PositionAreaEnum.Defense,
  12: PositionAreaEnum.Defense,
  13: PositionAreaEnum.Goalkeeper,
};

const calculateOverall = (
  positionId: PositionEnum,
  playerOverall: number,
  primaryPositionIds: PositionEnum[],
  secondaryPositionIds: PositionEnum[],
) => {
  if (playerOverall < PLAYERGLOBAL_MIN_OVERALL || playerOverall > PLAYERGLOBAL_MAX_OVERALL) {
    return { overall: '?', colorIndex: 5 };
  }

  if (primaryPositionIds.includes(positionId)) {
    return { overall: playerOverall * PositionRatingEnum.Primary, colorIndex: 0 };
  }

  if (secondaryPositionIds.includes(positionId)) {
    return {
      overall: Math.ceil(playerOverall * PositionRatingEnum.Secondary),
      colorIndex: 1,
    };
  }

  const positionArea = positionAreaByPositionId[positionId];

  const primaryAreaMatch = primaryPositionIds.some(
    (id) => positionAreaByPositionId[id] === positionArea,
  );
  if (primaryAreaMatch) {
    return {
      overall: Math.ceil(playerOverall * PositionRatingEnum.SameAreaPrimary),
      colorIndex: 2,
    };
  }

  const secondaryAreaMatch = secondaryPositionIds.some(
    (id) => positionAreaByPositionId[id] === positionArea,
  );
  if (secondaryAreaMatch) {
    return {
      overall: Math.ceil(playerOverall * PositionRatingEnum.SameAreaSecondary),
      colorIndex: 3,
    };
  }

  if (positionId === PositionEnum.GK) {
    return { overall: Math.ceil(playerOverall * PositionRatingEnum.NonGoalkeeper), colorIndex: 5 };
  }

  return {
    overall: Math.ceil(playerOverall * PositionRatingEnum.NonPlaying),
    colorIndex: 4,
  };
};

const PlayerPositionsRating = ({
  playerOverall,
  primaryPositionIds,
  secondaryPositionIds,
}: PlayerPositionsRatingProps) => {
  const positionOveralls = {
    [PositionEnum.CF]: calculateOverall(
      PositionEnum.CF,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.SS]: calculateOverall(
      PositionEnum.SS,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.LW]: calculateOverall(
      PositionEnum.LW,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.RW]: calculateOverall(
      PositionEnum.RW,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.AM]: calculateOverall(
      PositionEnum.AM,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.LM]: calculateOverall(
      PositionEnum.LM,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.RM]: calculateOverall(
      PositionEnum.RM,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.CM]: calculateOverall(
      PositionEnum.CM,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.DM]: calculateOverall(
      PositionEnum.DM,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.LB]: calculateOverall(
      PositionEnum.LB,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.RB]: calculateOverall(
      PositionEnum.RB,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.CB]: calculateOverall(
      PositionEnum.CB,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
    [PositionEnum.GK]: calculateOverall(
      PositionEnum.GK,
      playerOverall,
      primaryPositionIds,
      secondaryPositionIds,
    ),
  };

  const positionsColors = {
    attack: ['#FF4830', '#FF5e47', '#FF7063', '#D65D51', '#AB4D44', '#636363'],
    midfield: ['#30FF30', '#47FF4A', '#66FF63', '#55D651', '#46AB44', '#636363'],
    defense: ['#303AFF', '#475CFF', '#6373FF', '#515CD6', '#444DAB', '#636363'],
    goalkeeper: ['#FFBD30', '#FFBF47', '#636363', '#636363', '#636363', '#636363'],
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
            backgroundColor: positionsColors.attack[positionOveralls[PositionEnum.LW].colorIndex],
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
            borderTop: '2px solid #000000',
          }}
        >
          <div>{positionOveralls[PositionEnum.LW].overall}</div>
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
              backgroundColor: positionsColors.attack[positionOveralls[PositionEnum.CF].colorIndex],
              border: '1px solid #000000',
              borderTop: '2px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.CF].overall}</div>
            <div>CA</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor: positionsColors.attack[positionOveralls[PositionEnum.SS].colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.SS].overall}</div>
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
            backgroundColor: positionsColors.attack[positionOveralls[PositionEnum.RW].colorIndex],
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
            borderTop: '2px solid #000000',
          }}
        >
          <div>{positionOveralls[PositionEnum.RW].overall}</div>
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
            backgroundColor: positionsColors.midfield[positionOveralls[PositionEnum.LM].colorIndex],
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
          }}
        >
          <div>{positionOveralls[PositionEnum.LM].overall}</div>
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
              backgroundColor:
                positionsColors.midfield[positionOveralls[PositionEnum.AM].colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.AM].overall}</div>
            <div>MO</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor:
                positionsColors.midfield[positionOveralls[PositionEnum.CM].colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.CM].overall}</div>
            <div>MC</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor:
                positionsColors.midfield[positionOveralls[PositionEnum.DM].colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.DM].overall}</div>
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
            backgroundColor: positionsColors.midfield[positionOveralls[PositionEnum.RM].colorIndex],
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
          }}
        >
          <div>{positionOveralls[PositionEnum.RM].overall}</div>
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
            backgroundColor: positionsColors.defense[positionOveralls[PositionEnum.LB].colorIndex],
            border: '1px solid #000000',
            borderLeft: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <div>{positionOveralls[PositionEnum.LB].overall}</div>
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
              backgroundColor:
                positionsColors.defense[positionOveralls[PositionEnum.CB].colorIndex],
              border: '1px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.CB].overall}</div>
            <div>ZAG</div>
          </FlexProject>
          <FlexProject
            justify="center"
            align="center"
            vertical
            style={{
              width: '100%',
              height: 50,
              backgroundColor:
                positionsColors.goalkeeper[positionOveralls[PositionEnum.GK].colorIndex],
              border: '1px solid #000000',
              borderBottom: '2px solid #000000',
            }}
          >
            <div>{positionOveralls[PositionEnum.GK].overall}</div>
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
            backgroundColor: positionsColors.defense[positionOveralls[PositionEnum.RB].colorIndex],
            border: '1px solid #000000',
            borderRight: '2px solid #000000',
            borderBottom: '2px solid #000000',
          }}
        >
          <div>{positionOveralls[PositionEnum.RB].overall}</div>
          <div>LD</div>
        </FlexProject>
      </FlexProject>
    </div>
  );
};

export default PlayerPositionsRating;
