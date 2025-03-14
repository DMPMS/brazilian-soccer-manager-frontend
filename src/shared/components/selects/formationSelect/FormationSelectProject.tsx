import { Form } from 'antd';

import { FormationEnum } from '../../../enums/Formation.enum';
import { PositionEnum } from '../../../enums/Position.enum';
import { PositionAreaEnum } from '../../../enums/PositionArea.enum';
import { PositionRatingEnum } from '../../../enums/PositionRating.enum';
import { calculateOverallByPosition } from '../../../functions/calculateOverall';
import { PlayerglobalType } from '../../../types/Playerglobal.type';
import FlexProject from '../../flex/FlexProject';
import OverallProject from '../../others/overall/OverallProject';
import PositionTagProject from '../../tags/positionTag/PositionTagProject';
import SelectProject, { SelectProjectProps } from '../select/SelectProject';

type OptionType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  positionId: PositionEnum;
};

export const optionsPositionsByFormationMap: Record<FormationEnum, OptionType[]> = {
  [FormationEnum.F442]: [
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Goalkeeper}>GOL</PositionTagProject>
          <text>Goleiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.GK,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>ME</PositionTagProject>
          <text>Meio-Campista Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MD</PositionTagProject>
          <text>Meio-Campista Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
  ],
  [FormationEnum.F442Ofensive]: [
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Goalkeeper}>GOL</PositionTagProject>
          <text>Goleiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.GK,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>ME</PositionTagProject>
          <text>Meio-Campista Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.AM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MD</PositionTagProject>
          <text>Meio-Campista Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
  ],
  [FormationEnum.F442Defensive]: [
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Goalkeeper}>GOL</PositionTagProject>
          <text>Goleiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.GK,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>ME</PositionTagProject>
          <text>Meio-Campista Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>VOL</PositionTagProject>
          <text>Volante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.DM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MD</PositionTagProject>
          <text>Meio-Campista Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
  ],
  [FormationEnum.F433]: [
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Goalkeeper}>GOL</PositionTagProject>
          <text>Goleiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.GK,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.AM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTE</PositionTagProject>
          <text>Ponta Esquerda</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LW,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTD</PositionTagProject>
          <text>Ponta Direita</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RW,
    },
  ],
  [FormationEnum.F433Ofensive]: [
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Goalkeeper}>GOL</PositionTagProject>
          <text>Goleiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.GK,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RB,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.AM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
      positionId: PositionEnum.AM,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTE</PositionTagProject>
          <text>Ponta Esquerda</text>
        </FlexProject>
      ),
      positionId: PositionEnum.LW,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
      positionId: PositionEnum.CF,
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTD</PositionTagProject>
          <text>Ponta Direita</text>
        </FlexProject>
      ),
      positionId: PositionEnum.RW,
    },
  ],
};

interface SquadplanglobalPositionSelectsProps extends SelectProjectProps {
  formationId: FormationEnum;
  playerglobalIds: number[];
  playersglobalOfTeamglobalReducer: PlayerglobalType[];
  playersglobalWithoutTeamglobal: PlayerglobalType[];
  squadplanglobalPlayersglobalDict: { [key: string]: number | undefined };
  handleOnChangeSquadplanglobalPositionSelect: (index: number, value: string) => void;
}

const SquadplanglobalPositionSelects = ({
  formationId,
  playerglobalIds,
  playersglobalOfTeamglobalReducer,
  playersglobalWithoutTeamglobal,
  squadplanglobalPlayersglobalDict,
  handleOnChangeSquadplanglobalPositionSelect,
  ...props
}: SquadplanglobalPositionSelectsProps) => {
  return (
    <>
      {optionsPositionsByFormationMap[formationId]?.map((selectItem, index) => (
        <Form.Item
          key={index}
          label={selectItem.label}
          name={`squadplanglobalPlayerglobal${index}`}
        >
          <SelectProject
            placeholder={`Escolha a posição`}
            allowClear
            onChange={(value) => {
              handleOnChangeSquadplanglobalPositionSelect(index, value);
            }}
            options={[
              ...playersglobalOfTeamglobalReducer
                .filter((playerglobal: PlayerglobalType) =>
                  playerglobalIds.includes(playerglobal.id),
                )
                .map((playerglobal: PlayerglobalType) => ({
                  value: `${playerglobal.id}`,
                  disabled: Object.values(squadplanglobalPlayersglobalDict).includes(
                    playerglobal.id,
                  ),
                  label: (
                    <FlexProject justify="flex-start" align="center">
                      <OverallProject
                        overall={
                          calculateOverallByPosition(
                            selectItem.positionId,
                            playerglobal.overall,
                            playerglobal.playersglobalPosition
                              ?.filter(
                                (playerglobalPosition) =>
                                  playerglobalPosition.rating === PositionRatingEnum.Primary,
                              )
                              .map((playerglobalPosition) => playerglobalPosition.position?.id)
                              .filter((id): id is PositionEnum => id !== undefined) || [],
                            playerglobal.playersglobalPosition
                              ?.filter(
                                (playerglobalPosition) =>
                                  playerglobalPosition.rating === PositionRatingEnum.Secondary,
                              )
                              .map((playerglobalPosition) => playerglobalPosition.position?.id)
                              .filter((id): id is PositionEnum => id !== undefined) || [],
                          ).overall || 0
                        }
                        margin="0px 5px 0px 0px"
                      />
                      <text style={{ margin: '0px 5px 0px 0px' }}>{playerglobal.name}</text>
                      {playerglobal.playersglobalPosition
                        ?.filter(
                          (playerglobalPosition) =>
                            playerglobalPosition.rating === PositionRatingEnum.Primary,
                        )
                        .map((playerglobalPosition, index) => (
                          <PositionTagProject
                            area={playerglobalPosition.position?.area}
                            key={index}
                            primaryPosition={true}
                          >
                            {playerglobalPosition.position?.abbreviation}
                          </PositionTagProject>
                        ))}
                      {playerglobal.playersglobalPosition
                        ?.filter(
                          (playerglobalPosition) =>
                            playerglobalPosition.rating === PositionRatingEnum.Secondary,
                        )
                        .map((playerglobalPosition, index) => (
                          <PositionTagProject
                            area={playerglobalPosition.position?.area}
                            key={index}
                          >
                            {playerglobalPosition.position?.abbreviation}
                          </PositionTagProject>
                        ))}
                    </FlexProject>
                  ),
                })),
              ...playersglobalWithoutTeamglobal
                .filter((playerglobal: PlayerglobalType) =>
                  playerglobalIds.includes(playerglobal.id),
                )
                .map((playerglobal: PlayerglobalType) => ({
                  value: `${playerglobal.id}`,
                  disabled: Object.values(squadplanglobalPlayersglobalDict).includes(
                    playerglobal.id,
                  ),
                  label: (
                    <FlexProject justify="flex-start" align="center">
                      <OverallProject
                        overall={
                          calculateOverallByPosition(
                            selectItem.positionId,
                            playerglobal.overall,
                            playerglobal.playersglobalPosition
                              ?.filter(
                                (playerglobalPosition) =>
                                  playerglobalPosition.rating === PositionRatingEnum.Primary,
                              )
                              .map((playerglobalPosition) => playerglobalPosition.position?.id)
                              .filter((id): id is PositionEnum => id !== undefined) || [],
                            playerglobal.playersglobalPosition
                              ?.filter(
                                (playerglobalPosition) =>
                                  playerglobalPosition.rating === PositionRatingEnum.Secondary,
                              )
                              .map((playerglobalPosition) => playerglobalPosition.position?.id)
                              .filter((id): id is PositionEnum => id !== undefined) || [],
                          ).overall || 0
                        }
                        margin="0px 5px 0px 0px"
                      />
                      <text style={{ margin: '0px 5px 0px 0px' }}>{playerglobal.name}</text>
                      {playerglobal.playersglobalPosition
                        ?.filter(
                          (playerglobalPosition) =>
                            playerglobalPosition.rating === PositionRatingEnum.Primary,
                        )
                        .map((playerglobalPosition, index) => (
                          <PositionTagProject
                            area={playerglobalPosition.position?.area}
                            key={index}
                          >
                            {playerglobalPosition.position?.abbreviation}
                          </PositionTagProject>
                        ))}
                    </FlexProject>
                  ),
                })),
            ]}
            showSearch
            filterSort={(optionA, optionB) => {
              const overallA = optionA.label.props.children[0].props.overall || 0;
              const overallB = optionB.label.props.children[0].props.overall || 0;
              return overallB - overallA;
            }}
            {...props}
          />
        </Form.Item>
      ))}
    </>
  );
};

export default SquadplanglobalPositionSelects;
