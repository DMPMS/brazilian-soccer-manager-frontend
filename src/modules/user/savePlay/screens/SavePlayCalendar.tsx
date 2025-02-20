import { CloseOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import SelectProject from '../../../../shared/components/selects/select/SelectProject';
import { LimitedContainerProject } from '../../../../shared/components/styles/limited.styled';
import TableProject from '../../../../shared/components/table/TableProject';
import { DATETIME_FORMAT } from '../../../../shared/constants/others';
import { MatchType } from '../../../../shared/types/Match.type';
import { useSavePlayCalendar } from '../hooks/useSavePlayCalendar';
import { SavePlayRoutesEnum } from '../routes';

const SavePlayCalendar = () => {
  const {
    savePlayTeamsaveMatches,
    savePlayDistinctMatchMonths,
    handleOnChangeRadio,
    handleOnChangeMonthSelect,
  } = useSavePlayCalendar();

  const columns: ColumnsType<MatchType> = useMemo(
    () => [
      {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: (_, target) => dayjs(target.date).format(DATETIME_FORMAT),
      },
      {
        title: 'Times',
        dataIndex: 'teamssave',
        key: 'teamssave',
        width: 400,
        render: (_, target) => (
          <FlexProject justify="space-between" align="center">
            <FlexProject justify="flex-end" align="center" style={{ width: 150 }}>
              <text>{target.teamsaveHome?.name}</text>
              <ImageProject
                src={target.teamsaveHome?.srcImage}
                width={25}
                height={25}
                margin="0px 0px 0px 5px"
              />
            </FlexProject>

            {target.teamsaveHomeGoals && <text>{target.teamsaveHomeGoals}</text>}

            <CloseOutlined />

            {target.teamsaveAwayGoals && <text>{target.teamsaveAwayGoals}</text>}

            <FlexProject justify="flex-start" align="center" style={{ width: 150 }}>
              <ImageProject
                src={target.teamsaveAway?.srcImage}
                width={25}
                height={25}
                margin="0px 5px 0px 0px"
              />
              <text>{target.teamsaveAway?.name}</text>
            </FlexProject>
          </FlexProject>
        ),
      },
      {
        title: 'Competição',
        dataIndex: 'competitionsave',
        key: 'competitionsave',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <ImageProject
              src={target.round?.competitionsave?.srcImage}
              width={20}
              height={20}
              margin="0px 5px 0px 0px"
            />
            <text>
              {target.round?.competitionsave?.name} {target.round?.competitionsave?.season} -{' '}
              {target.round?.name}
            </text>
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
          name: 'Calendário',
        },
      ]}
      isSavePlay={true}
    >
      <FlexProject justify="flex-start" margin="0px 0px 16px 0px">
        <LimitedContainerProject width={400} margin="0px 5px 0px 0px">
          <Radio.Group
            defaultValue="all"
            buttonStyle="solid"
            onChange={(event) => handleOnChangeRadio(event)}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Radio.Button value="all" style={{ width: '33.34%' }}>
              Casa e Fora
            </Radio.Button>
            <Radio.Button value="home" style={{ width: '33.33%' }}>
              Casa
            </Radio.Button>
            <Radio.Button value="away" style={{ width: '33.33%' }}>
              Fora
            </Radio.Button>
          </Radio.Group>
        </LimitedContainerProject>

        <LimitedContainerProject width={240}>
          <SelectProject
            placeholder="Selecione o mês"
            allowClear
            onChange={handleOnChangeMonthSelect}
            showSearch
            options={savePlayDistinctMatchMonths.map((month) => ({
              label: month,
              value: month,
            }))}
            style={{ width: '100%' }}
          />
        </LimitedContainerProject>
      </FlexProject>

      <TableProject columns={columns} dataSource={savePlayTeamsaveMatches} />
    </Screen>
  );
};

export default SavePlayCalendar;
