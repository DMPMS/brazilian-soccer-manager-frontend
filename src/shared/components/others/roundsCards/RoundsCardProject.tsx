import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { DATETIME_FORMAT } from '../../../constants/others';
import { MatchType } from '../../../types/Match.type';
import { RoundType } from '../../../types/Round.type';
import ButtonProject from '../../buttons/button/ButtonProject';
import FlexProject from '../../flex/FlexProject';
import ImageProject from '../../images/imageProject/ImageProject';
import { LimitedContainerProject } from '../../styles/limited.styled';

interface CardProjectProps {
  rounds: RoundType[];
}

const RoundsCardProject = ({ rounds }: CardProjectProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleOnClickPrevRound = () => {
    setActiveTabIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleOnClickNextRound = () => {
    setActiveTabIndex((prevIndex) => Math.min(prevIndex + 1, tabList.length - 1));
  };

  const tabList = rounds.map((round) => ({
    key: `${round.id}`,
    label: round.name,
  }));

  const contentList: Record<string, React.ReactNode> = rounds.reduce(
    (acc, round) => {
      acc[`${round.id}`] = round.matches?.map((match: MatchType, index) => (
        <FlexProject justify="center" align="center" margin={'0px 0px 2px 0px'} key={index}>
          <text>{dayjs(match.date).format(DATETIME_FORMAT)}</text>
          <LimitedContainerProject width={400}>
            <FlexProject justify="space-between" align="center">
              <FlexProject justify="flex-end" align="center" style={{ width: 150 }}>
                <text>{match.teamsaveHome?.name}</text>
                <ImageProject
                  src={match.teamsaveHome?.srcImage}
                  width={25}
                  height={25}
                  margin="0px 0px 0px 5px"
                />
              </FlexProject>

              {match.teamsaveHomeGoals && <text>{match.teamsaveHomeGoals}</text>}

              <CloseOutlined />

              {match.teamsaveAwayGoals && <text>{match.teamsaveAwayGoals}</text>}

              <FlexProject justify="flex-start" align="center" style={{ width: 150 }}>
                <ImageProject
                  src={match.teamsaveAway?.srcImage}
                  width={25}
                  height={25}
                  margin="0px 5px 0px 0px"
                />
                <text>{match.teamsaveAway?.name}</text>
              </FlexProject>
            </FlexProject>
          </LimitedContainerProject>
        </FlexProject>
      ));
      return acc;
    },
    {} as Record<string, React.ReactNode>,
  );

  return (
    <Card
      style={{ width: 600 }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <ButtonProject
            type="text"
            icon={<LeftOutlined />}
            onClick={handleOnClickPrevRound}
            disabled={activeTabIndex === 0}
          />
          <Typography.Title level={5} style={{ margin: 0 }}>
            {tabList[activeTabIndex]?.label}
          </Typography.Title>
          <ButtonProject
            type="text"
            icon={<RightOutlined />}
            onClick={handleOnClickNextRound}
            disabled={activeTabIndex === tabList.length - 1}
          />
        </div>
      }
    >
      {contentList[tabList[activeTabIndex].key]}
    </Card>
  );
};

export default RoundsCardProject;
