import Search from 'antd/es/input/Search';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/buttons/button/Button';
import Image from '../../../shared/components/image/Image';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexAlignCenter,
  DisplayFlexDirectionRow,
  DisplayFlexJustifyBetween,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import CountrySVG from '../../../shared/components/svg/CountrySVG';
import Table from '../../../shared/components/table/Table';
import { CompetitionglobalType } from '../../../shared/types/CompetitionglobalType';
import { useCompetitionglobal } from '../hooks/useCompetitionglobal';
import { CompetitionglobalRoutesEnum } from '../routes';

const Competitionglobal = () => {
  const { competitionsglobal, handleOnSearch } = useCompetitionglobal();
  const navigate = useNavigate();

  const handleOnClickInsert = () => {
    navigate(CompetitionglobalRoutesEnum.COMPETITIONGLOBAL_INSERT);
  };

  const columns: ColumnsType<CompetitionglobalType> = useMemo(
    () => [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (_, target) => (
          <DisplayFlexDirectionRow>
            <DisplayFlexAlignCenter margin="0px 5px 0px 0px">
              <Image src={target.srcImage} width={20} height={20} />
            </DisplayFlexAlignCenter>
            <text>
              {target.name} {target.season}
            </text>
          </DisplayFlexDirectionRow>
        ),
      },
      {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
        render: (_, target) => {
          if (target.rule?.competitionType === 1) {
            return 'Liga';
          } else if (target.rule?.competitionType === 2) {
            return 'Copa';
          } else {
            return '';
          }
        },
      },
      {
        title: 'País',
        dataIndex: 'country',
        key: 'country',
        render: (_, target) => (
          <DisplayFlexDirectionRow>
            <DisplayFlexAlignCenter margin="0px 5px 0px 0px">
              <CountrySVG name={target.country?.name} width={20} height={20} />
            </DisplayFlexAlignCenter>
            <text>{target.country?.name}</text>
          </DisplayFlexDirectionRow>
        ),
      },
    ],
    [],
  );

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'COMPETIÇÕES',
        },
      ]}
    >
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar competição" onSearch={handleOnSearch} enterButton />
        </LimitedContainer>

        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={competitionsglobal} />
    </Screen>
  );
};

export default Competitionglobal;
