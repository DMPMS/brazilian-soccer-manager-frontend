import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import LoadingProject from '../../../../shared/components/loading/LoadingProject';
import RoundsCardProject from '../../../../shared/components/others/roundsCards/RoundsCardProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import TableProject from '../../../../shared/components/table/TableProject';
import { RankingType } from '../../../../shared/types/Ranking.type';
import { useSavePlayCompetitionDetail } from '../hooks/useSavePlayCompetitionDetail';
import { SavePlayRoutesEnum } from '../routes';

const SavePlayCompetitionDetail = () => {
  const { competitionsaveId } = useParams<{ competitionsaveId: string }>();

  const { loadingCompetitionsave, savePlayCompetitionsave } =
    useSavePlayCompetitionDetail(competitionsaveId);

  const rounds = savePlayCompetitionsave?.rounds || [];

  const columns: ColumnsType<RankingType> = useMemo(
    () => [
      {
        title: 'Posição',
        key: 'position',
        render: (_, __, index) => `${index + 1}º`,
      },
      {
        title: 'Time',
        dataIndex: 'teamsave',
        key: 'teamsave',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <ImageProject
              src={target.teamsave?.srcImage}
              width={20}
              height={20}
              margin="0px 5px 0px 0px"
            />
            <text>{target.teamsave?.name}</text>
          </FlexProject>
        ),
      },
      {
        title: 'PTS',
        dataIndex: 'points',
        key: 'points',
      },
      {
        title: 'PJ',
        dataIndex: 'played',
        key: 'played',
      },
      {
        title: 'V',
        dataIndex: 'wins',
        key: 'wins',
      },
      {
        title: 'E',
        dataIndex: 'draws',
        key: 'draws',
      },
      {
        title: 'D',
        dataIndex: 'losses',
        key: 'losses  ',
      },
      {
        title: 'GM',
        dataIndex: 'goalsFor',
        key: 'goalsFor',
      },
      {
        title: 'GS',
        dataIndex: 'goalsAgainst',
        key: 'goalsAgainst',
      },
      {
        title: 'SG',
        dataIndex: 'goalsDifference',
        key: 'goalsDifference',
      },
    ],
    [],
  );

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
        <>
          <RoundsCardProject rounds={rounds} />
          <br></br>
          <TableProject
            columns={columns}
            dataSource={savePlayCompetitionsave?.rankings}
            size="small"
            pagination={false}
          />
        </>
      )}
    </Screen>
  );
};

export default SavePlayCompetitionDetail;
