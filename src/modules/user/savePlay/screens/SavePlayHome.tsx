import { Card, Typography } from 'antd';
import dayjs from 'dayjs';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import { DATE_FORMAT, TIME_FORMAT } from '../../../../shared/constants/others';
import { useSavePlayHome } from '../hooks/useSavePlayHome';

const SavePlayHome = () => {
  const { first4Matches } = useSavePlayHome();

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
              {index === 0 && (
                <Typography.Title level={4} style={{ margin: '0px 0px 0px 8px' }}>
                  3
                </Typography.Title>
              )}

              <FlexProject justify="center" align="center" vertical>
                <ImageProject src={match.round?.competitionsave?.srcImage} width={25} height={25} />

                <Typography.Title level={5} style={{ margin: 0 }}>
                  {dayjs(match.date).format(DATE_FORMAT)}
                </Typography.Title>
                <Typography.Text style={{ margin: 0 }}>
                  {dayjs(match.date).format(TIME_FORMAT)}
                </Typography.Text>
              </FlexProject>

              {index === 0 && (
                <Typography.Title level={4} style={{ margin: '0px 8px 0px 0px' }}>
                  1
                </Typography.Title>
              )}
              <ImageProject src={match.teamsaveAway?.srcImage} width={25} height={25} />
            </FlexProject>
          </Card>
        ))}
      </FlexProject>
    </Screen>
  );
};

export default SavePlayHome;
