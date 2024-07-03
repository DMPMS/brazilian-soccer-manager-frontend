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
    handleOnClickManagerglobalCardView,
    handleOnClickManagerglobalCardInsert,
    handleOnClickPlayerglobalCardView,
    handleOnClickPlayerglobalCardInsert,
    handleOnClickTeamglobalCardView,
    handleOnClickTeamglobalCardInsert,
    handleOnClickCompetitionglobalCardView,
    handleOnClickCompetitionglobalCardInsert,
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
              onClick={handleOnClickPlayerglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnClickPlayerglobalCardView}>
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
              onClick={handleOnClickManagerglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnClickManagerglobalCardView}>
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
              onClick={handleOnClickTeamglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnClickTeamglobalCardView}>
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
              onClick={handleOnClickCompetitionglobalCardInsert}
            />,
          ]}
        >
          <FlexProject justify="space-between" onClick={handleOnClickCompetitionglobalCardView}>
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
