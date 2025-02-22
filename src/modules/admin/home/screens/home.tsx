import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import CompetitionIconSVGProject from '../../../../shared/components/svg/CompetitionIconSVGProject';
import ManagerIconSVGProject from '../../../../shared/components/svg/ManagerIconSVGProject';
import PlayerIconSVGProject from '../../../../shared/components/svg/PlayeIconSVGProject';
import TeamIconSVGProject from '../../../../shared/components/svg/TeamIconSVGProject';
import { useHome } from '../hooks/useHome';

const Home = () => {
  const {
    handleOnManagerglobalCardView,
    handleOnManagerglobalCardInsert,
    handleOnPlayerglobalCardView,
    handleOnPlayerglobalCardInsert,
    handleOnTeamglobalCardView,
    handleOnTeamglobalCardInsert,
    handleOnCompetitionglobalCardView,
    handleOnCompetitionglobalCardInsert,
  } = useHome();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
        },
      ]}
    >
      <FlexProject justify="space-between">
        <Card
          bordered={true}
          hoverable
          style={{ width: 300 }}
          actions={[
            <PlusCircleOutlined
              title="Inserir jogador"
              key="playersglobal_insert"
              onClick={handleOnPlayerglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnPlayerglobalCardView}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Jogadores
            </Typography.Title>
            <PlayerIconSVGProject width={25} height={25} />
          </FlexProject>
        </Card>

        <Card
          bordered={true}
          hoverable
          style={{ width: 300 }}
          actions={[
            <PlusCircleOutlined
              title="Inserir treinador"
              key="managersglobal_insert"
              onClick={handleOnManagerglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnManagerglobalCardView}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Treinadores
            </Typography.Title>
            <ManagerIconSVGProject width={25} height={25} />
          </FlexProject>
        </Card>

        <Card
          bordered={true}
          hoverable
          style={{ width: 300 }}
          actions={[
            <PlusCircleOutlined
              title="Inserir time"
              key="teamsglobal_insert"
              onClick={handleOnTeamglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnTeamglobalCardView}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Times
            </Typography.Title>
            <TeamIconSVGProject width={25} height={25} />
          </FlexProject>
        </Card>

        <Card
          bordered={true}
          hoverable
          style={{ width: 300 }}
          actions={[
            <PlusCircleOutlined
              title="Inserir competição"
              key="competitionsglobal_insert"
              onClick={handleOnCompetitionglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnCompetitionglobalCardView}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Competições
            </Typography.Title>
            <CompetitionIconSVGProject width={25} height={25} />
          </FlexProject>
        </Card>
      </FlexProject>
    </Screen>
  );
};

export default Home;
