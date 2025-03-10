import { EyeFilled } from '@ant-design/icons';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import CountrySVGProject from '../../../../shared/components/svg/CountrySVGProject';
import TableProject from '../../../../shared/components/table/TableProject';
import { CompetitionsaveType } from '../../../../shared/types/Competitionsave.type';
import { useSavePlayCompetition } from '../hooks/useSavePlayCompetition';
import { SavePlayRoutesEnum } from '../routes';

const SavePlayCompetition = () => {
  const { savePlayCompetitionssave, handleOnDetail } = useSavePlayCompetition();

  const columns: ColumnsType<CompetitionsaveType> = useMemo(
    () => [
      {
        title: 'País',
        dataIndex: 'country',
        key: 'country',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <CountrySVGProject
              name={target.rule?.country?.name}
              width={20}
              height={20}
              margin="0px 5px 0px 0px"
            />
            <text>{target.rule?.country?.name}</text>
          </FlexProject>
        ),
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (_, target) => (
          <FlexProject justify="flex-start" align="center">
            <ImageProject src={target.srcImage} width={20} height={20} margin="0px 5px 0px 0px" />
            <text>
              {target.name} {target.season}
            </text>
          </FlexProject>
        ),
      },
      {
        title: 'Ações',
        dataIndex: '',
        key: 'x',
        render: (_, target) => (
          <Space>
            <ButtonProject
              type="primary"
              onClick={() => handleOnDetail(target.id)}
              icon={<EyeFilled />}
            ></ButtonProject>
          </Space>
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
          name: 'Competições',
        },
      ]}
      isSavePlay={true}
    >
      <TableProject columns={columns} dataSource={savePlayCompetitionssave} />
    </Screen>
  );
};

export default SavePlayCompetition;
