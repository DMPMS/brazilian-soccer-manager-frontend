import { PLAYERSAVE_PRIMARY_POSITION_RATING } from '../constants/others';
import { PlayersaveType } from '../types/Playersave.type';

export const orderPlayersaveByPosition = (playerssave: PlayersaveType[]) => {
  const playerssaveCopy = [...playerssave];

  return playerssaveCopy.sort((a, b) => {
    const playerpositionA = a.playerssavePosition?.find(
      (playersavePosition) =>
        playersavePosition.position?.id &&
        playersavePosition.rating === PLAYERSAVE_PRIMARY_POSITION_RATING,
    );
    const playerpositionB = b.playerssavePosition?.find(
      (playersavePosition) =>
        playersavePosition.position?.id &&
        playersavePosition.rating === PLAYERSAVE_PRIMARY_POSITION_RATING,
    );

    if (!playerpositionA && playerpositionB) return 1;
    if (!playerpositionB && playerpositionA) return -1;

    if (
      playerpositionA &&
      playerpositionA.position &&
      playerpositionB &&
      playerpositionB.position
    ) {
      return playerpositionB.position.id - playerpositionA.position.id;
    }

    return 0;
  });
};
