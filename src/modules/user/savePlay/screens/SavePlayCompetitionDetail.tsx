import { useParams } from 'react-router-dom';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import LoadingProject from '../../../../shared/components/loading/LoadingProject';
import RoundsCardProject from '../../../../shared/components/others/roundsCards/RoundsCardProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import { useSavePlayCompetitionDetail } from '../hooks/useSavePlayCompetitionDetail';
import { SavePlayRoutesEnum } from '../routes';

const SavePlayCompetitionDetail = () => {
  const { competitionsaveId } = useParams<{ competitionsaveId: string }>();

  const { loadingCompetitionsave, savePlayCompetitionsave } =
    useSavePlayCompetitionDetail(competitionsaveId);

  const rounds = savePlayCompetitionsave?.rounds || [];

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
          navigateTo: SavePlayRoutesEnum.SAVE_PLAY_HOME,
        },
        {
          name: 'Competições',
          navigateTo: SavePlayRoutesEnum.SAVE_PLAY_COMPETITION,
        },
        {
          name: `Detalhes da Competição`,
        },
      ]}
      isSavePlay={true}
    >
      {loadingCompetitionsave ? (
        <FlexProject justify="center">
          <LoadingProject width={50} height={50} />
        </FlexProject>
      ) : (
        <RoundsCardProject rounds={rounds} />
      )}
    </Screen>
  );
};

export default SavePlayCompetitionDetail;
