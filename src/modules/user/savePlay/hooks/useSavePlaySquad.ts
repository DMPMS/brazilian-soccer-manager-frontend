import { useSavePlay } from './useSavePlay';

export const useSavePlaySquad = () => {
  const { savePlayTeamsavePlayerssave } = useSavePlay();

  return { savePlayTeamsavePlayerssave };
};
