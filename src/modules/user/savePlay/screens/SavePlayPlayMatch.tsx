import { CloseOutlined } from '@ant-design/icons';
import { List } from 'antd';
import dayjs from 'dayjs';

import FlexProject from '../../../../shared/components/flex/FlexProject';
import ImageProject from '../../../../shared/components/images/imageProject/ImageProject';
import OverallByMoraleProject from '../../../../shared/components/others/overallByMorale/OverallByMoraleProject';
import StaminaBarProject from '../../../../shared/components/others/staminaBar/StaminaBarProject';
import Screen from '../../../../shared/components/screen/ScreenProject';
import { LimitedContainerProject } from '../../../../shared/components/styles/limited.styled';
import PositionTagProject from '../../../../shared/components/tags/positionTag/PositionTagProject';
import { DATETIME_FORMAT } from '../../../../shared/constants/others';
import { PositionEnum } from '../../../../shared/enums/Position.enum';
import { PositionRatingEnum } from '../../../../shared/enums/PositionRating.enum';
import { calculateOverallByPosition } from '../../../../shared/functions/calculateOverall';
import { useSavePlayPlayMatch } from '../hooks/useSavePlayPlayMatch';

const SavePlayPlayMatch = () => {
  const {
    savePlayPlayMatch,
    playMatch,
    teamsaveHomeSquadplansavePositionsAndPlayerssave,
    teamsaveAwaySquadplansavePositionsAndPlayerssave,
  } = useSavePlayPlayMatch();

  return (
    <Screen isSavePlay={true}>
      <FlexProject justify="center" align="center" vertical>
        <FlexProject justify="flex-start" align="center">
          <ImageProject
            src={savePlayPlayMatch?.round?.competitionsave?.srcImage}
            width={20}
            height={20}
            margin="0px 5px 0px 0px"
          />
          <text>
            {savePlayPlayMatch?.round?.competitionsave?.name}{' '}
            {savePlayPlayMatch?.round?.competitionsave?.season} - {savePlayPlayMatch?.round?.name} -{' '}
            {dayjs(savePlayPlayMatch?.date).format(DATETIME_FORMAT)}
          </text>
        </FlexProject>
        <br></br>
        <LimitedContainerProject width={700}>
          <FlexProject
            justify="space-between"
            align="center"
            style={{ border: '1px solid #ccc', borderRadius: 10, padding: 15 }}
          >
            <FlexProject justify="flex-end" align="center" style={{ width: 150 }}>
              <text>{playMatch?.teamsaveHome?.name}</text>
              <ImageProject
                src={playMatch?.teamsaveHome?.srcImage}
                width={50}
                height={50}
                margin="0px 0px 0px 5px"
              />
            </FlexProject>

            <text>{playMatch?.teamsaveHomeGoals}</text>

            <CloseOutlined />

            <text>{playMatch?.teamsaveAwayGoals}</text>

            <FlexProject justify="flex-start" align="center" style={{ width: 150 }}>
              <ImageProject
                src={playMatch?.teamsaveAway?.srcImage}
                width={50}
                height={50}
                margin="0px 5px 0px 0px"
              />
              <text>{playMatch?.teamsaveAway?.name}</text>
            </FlexProject>
          </FlexProject>
        </LimitedContainerProject>
        <br></br>
        <LimitedContainerProject width={700}>
          <FlexProject justify="space-between" align="center">
            <List
              size="small"
              header={
                <FlexProject justify="center" align="center">
                  {playMatch?.teamsaveHome?.squadplansave?.formation?.name}
                </FlexProject>
              }
              bordered
              dataSource={Object.values(teamsaveHomeSquadplansavePositionsAndPlayerssave)}
              renderItem={(item) => (
                <List.Item>
                  <FlexProject justify="space-between" align="center" style={{ width: 300 }}>
                    <FlexProject justify="flex-start" align="center">
                      <PositionTagProject
                        area={item.position?.area}
                        style={{ margin: '0px 5px 0px 0px' }}
                      >
                        {item.position?.abbreviation}
                      </PositionTagProject>
                      <FlexProject justify="flex-end" align="center" style={{ width: 20 }}>
                        <OverallByMoraleProject
                          morale={item.playersave?.morale || 1}
                          margin={'0px 5px 0px 0px'}
                          overall={
                            calculateOverallByPosition(
                              item.position?.id || 1,
                              item.playersave?.overall || 0,
                              item.playersave?.playerssavePosition
                                ?.filter(
                                  (playersavePosition) =>
                                    playersavePosition.rating === PositionRatingEnum.Primary,
                                )
                                .map((playersavePosition) => playersavePosition.position?.id)
                                .filter((id): id is PositionEnum => id !== undefined) || [],
                              item.playersave?.playerssavePosition
                                ?.filter(
                                  (playersavePosition) =>
                                    playersavePosition.rating === PositionRatingEnum.Secondary,
                                )
                                .map((playersavePosition) => playersavePosition.position?.id)
                                .filter((id): id is PositionEnum => id !== undefined) || [],
                            ).overall || 0
                          }
                        />
                      </FlexProject>

                      <div style={{ margin: '0px 5px 0px 0px' }}>{item.playersave?.name}</div>
                    </FlexProject>
                    <div style={{ width: 100 }}>
                      <StaminaBarProject stamina={item.playersave?.stamina || 0} />
                    </div>
                  </FlexProject>
                </List.Item>
              )}
            />
            <List
              size="small"
              header={
                <FlexProject justify="center" align="center">
                  {playMatch?.teamsaveAway?.squadplansave?.formation?.name}
                </FlexProject>
              }
              bordered
              dataSource={Object.values(teamsaveAwaySquadplansavePositionsAndPlayerssave)}
              renderItem={(item) => (
                <List.Item>
                  <FlexProject justify="space-between" align="center" style={{ width: 300 }}>
                    <FlexProject justify="flex-start" align="center">
                      <PositionTagProject
                        area={item.position?.area}
                        style={{ margin: '0px 5px 0px 0px' }}
                      >
                        {item.position?.abbreviation}
                      </PositionTagProject>
                      <FlexProject justify="flex-end" align="center" style={{ width: 20 }}>
                        <OverallByMoraleProject
                          morale={item.playersave?.morale || 1}
                          margin={'0px 5px 0px 0px'}
                          overall={
                            calculateOverallByPosition(
                              item.position?.id || 1,
                              item.playersave?.overall || 0,
                              item.playersave?.playerssavePosition
                                ?.filter(
                                  (playersavePosition) =>
                                    playersavePosition.rating === PositionRatingEnum.Primary,
                                )
                                .map((playersavePosition) => playersavePosition.position?.id)
                                .filter((id): id is PositionEnum => id !== undefined) || [],
                              item.playersave?.playerssavePosition
                                ?.filter(
                                  (playersavePosition) =>
                                    playersavePosition.rating === PositionRatingEnum.Secondary,
                                )
                                .map((playersavePosition) => playersavePosition.position?.id)
                                .filter((id): id is PositionEnum => id !== undefined) || [],
                            ).overall || 0
                          }
                        />
                      </FlexProject>

                      <div style={{ margin: '0px 5px 0px 0px' }}>{item.playersave?.name}</div>
                    </FlexProject>
                    <div style={{ width: 100 }}>
                      <StaminaBarProject stamina={item.playersave?.stamina || 0} />
                    </div>
                  </FlexProject>
                </List.Item>
              )}
            />
          </FlexProject>
        </LimitedContainerProject>
      </FlexProject>
    </Screen>
  );
};

export default SavePlayPlayMatch;
