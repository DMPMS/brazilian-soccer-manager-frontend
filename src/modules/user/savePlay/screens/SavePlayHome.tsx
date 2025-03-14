import { Card, Typography } from 'antd';
import dayjs from 'dayjs';

import ButtonProject from '../../../../shared/components/buttons/button/ButtonProject';
import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import { DATE_FORMAT, TIME_FORMAT } from '../../../../shared/constants/others';
import { useSavePlayHome } from '../hooks/useSavePlayHome';

const SavePlayHome = () => {
  const { first4Matches, handleOnPlayMatch } = useSavePlayHome();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'Página inicial',
        },
      ]}
      isSavePlay={true}
    >
      <FlexProject justify="space-between">
        {first4Matches.map((match, index) => (
          <Card key={index} bordered={true} hoverable style={{ width: 300 }}>
            <FlexProject justify="space-between" align="center">
              <ImageProject src={match.teamsaveHome?.srcImage} width={25} height={25} />

              <FlexProject justify="center" align="center" vertical>
                <ImageProject src={match.round?.competitionsave?.srcImage} width={25} height={25} />

                <Typography.Title level={5} style={{ margin: 0 }}>
                  {dayjs(match.date).format(DATE_FORMAT)}
                </Typography.Title>
                <Typography.Text style={{ margin: 0 }}>
                  {dayjs(match.date).format(TIME_FORMAT)}
                </Typography.Text>

                {index === 0 && (
                  <ButtonProject onClick={() => handleOnPlayMatch(match.id)}>
                    Próxima partida
                  </ButtonProject>
                )}
              </FlexProject>

              <ImageProject src={match.teamsaveAway?.srcImage} width={25} height={25} />
            </FlexProject>
          </Card>
        ))}
      </FlexProject>
    </Screen>
  );
};

export default SavePlayHome;
