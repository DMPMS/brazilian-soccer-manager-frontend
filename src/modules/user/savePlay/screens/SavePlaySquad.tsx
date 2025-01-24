import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import StaminaBarProject from '../../../../shared/components/others/staminaBar/StaminaBarProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import TableProject from '../../../../shared/components/table/TableProject';
import PositionTagProject from '../../../../shared/components/tags/positionTag/PositionTagProject';
import { PLAYERSAVE_PRIMARY_POSITION_RATING } from '../../../../shared/constants/others';
import { orderPlayersaveByPosition } from '../../../../shared/functions/orderPlayersaveByPosition';
import { PlayersaveType } from '../../../../shared/types/Playersave.type';
import { useSavePlaySquad } from '../hooks/useSavePlaySquad';
import { SavePlayRoutesEnum } from '../routes';

const SavePlaySquad = () => {
  const { savePlayTeamsavePlayerssave } = useSavePlaySquad();

  const columns: ColumnsType<PlayersaveType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Geral',
        dataIndex: 'overall',
        key: 'overall',
        sorter: (a, b) => a.overall - b.overall,
      },
      {
        title: 'Energia',
        dataIndex: 'stamina',
        key: 'stamina',
        render: (_, target) => {
          return <StaminaBarProject stamina={target.stamina} />;
        },
        sorter: (a, b) => a.stamina - b.stamina,
      },
      {
        title: 'Posições',
        dataIndex: 'positions',
        key: 'positions',
        render: (_, target) => (
          <>
            {target.playerssavePosition
              ?.filter(
                (playersavePosition) =>
                  playersavePosition.rating === PLAYERSAVE_PRIMARY_POSITION_RATING,
              )
              .map((playersavePosition, index) => (
                <PositionTagProject area={playersavePosition.position?.area} key={index}>
                  {playersavePosition.position?.abbreviation}
                </PositionTagProject>
              ))}
          </>
        ),
        sorter: (a, b) => {
          const sortedPlayerssave = orderPlayersaveByPosition([a, b]);
          return sortedPlayerssave.indexOf(a) - sortedPlayerssave.indexOf(b);
        },
        defaultSortOrder: 'ascend',
      },
      {
        title: 'Nacionalidade',
        dataIndex: 'country',
        key: 'country',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <CountrySVGProject
              name={target.country?.name}
              width={20}
              height={20}
              style={{ margin: '0px 5px 0px 0px' }}
            />
            <text>{target.country?.name}</text>
          </FlexProject>
        ),
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
          name: 'Elenco',
        },
      ]}
      isSavePlay={true}
    >
      <TableProject columns={columns} dataSource={savePlayTeamsavePlayerssave} />
    </Screen>
  );
};

export default SavePlaySquad;
