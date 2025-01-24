import { useSavePlay } from './useSavePlay';

export const useSavePlayHome = () => {
  const { savePlayTeamsaveMatches } = useSavePlay();

  const first4Matches = savePlayTeamsaveMatches.slice(0, 4);

  return { first4Matches };
};
