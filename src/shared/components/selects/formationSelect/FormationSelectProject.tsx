import { Form } from 'antd';

import {
  PLAYERGLOBAL_PRIMARY_POSITION_RATING,
  PLAYERGLOBAL_SECONDARY_POSITION_RATING,
} from '../../../constants/others';
import { FormationEnum } from '../../../enums/Formation.enum';
import { PositionAreaEnum } from '../../../enums/PositionArea.enum';
import { PlayerglobalType } from '../../../types/Playerglobal.type';
import FlexProject from '../../flex/FlexProject';
import PositionTagProject from '../../tags/positionTag/PositionTagProject';
import SelectProject, { SelectProjectProps } from '../select/SelectProject';

type OptionType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
};

const optionsMap: Record<FormationEnum, OptionType[]> = {
  [FormationEnum.F442]: [
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Goalkeeper}>GOL</PositionTagProject>
          <text>Goleiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>ME</PositionTagProject>
          <text>Meio-Campista Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MD</PositionTagProject>
          <text>Meio-Campista Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
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
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>ME</PositionTagProject>
          <text>Meio-Campista Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MD</PositionTagProject>
          <text>Meio-Campista Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
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
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>ME</PositionTagProject>
          <text>Meio-Campista Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>VOL</PositionTagProject>
          <text>Volante</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MD</PositionTagProject>
          <text>Meio-Campista Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
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
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTE</PositionTagProject>
          <text>Ponta Esquerda</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTD</PositionTagProject>
          <text>Ponta Direita</text>
        </FlexProject>
      ),
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
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LE</PositionTagProject>
          <text>Lateral Esquerdo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>ZAG</PositionTagProject>
          <text>Zagueiro</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Defense}>LD</PositionTagProject>
          <text>Lateral Direito</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MC</PositionTagProject>
          <text>Meio-Campista Central</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Midfield}>MO</PositionTagProject>
          <text>Meio-Campista Ofensivo</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTE</PositionTagProject>
          <text>Ponta Esquerda</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>CA</PositionTagProject>
          <text>Centroavante</text>
        </FlexProject>
      ),
    },
    {
      label: (
        <FlexProject justify="flex-start" align="center">
          <PositionTagProject area={PositionAreaEnum.Attack}>PTD</PositionTagProject>
          <text>Ponta Direita</text>
        </FlexProject>
      ),
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
      {optionsMap[formationId]?.map((selectItem, index) => (
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
                      <text style={{ margin: '0px 5px 0px 0px' }}>
                        {playerglobal.name} - {playerglobal.overall} -
                      </text>
                      {playerglobal.playersglobalPosition
                        ?.filter(
                          (playerglobalPosition) =>
                            playerglobalPosition.rating === PLAYERGLOBAL_PRIMARY_POSITION_RATING,
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
                            playerglobalPosition.rating === PLAYERGLOBAL_SECONDARY_POSITION_RATING,
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
                      <text style={{ margin: '0px 5px 0px 0px' }}>
                        {playerglobal.name} - {playerglobal.overall} -
                      </text>
                      {playerglobal.playersglobalPosition
                        ?.filter(
                          (playerglobalPosition) =>
                            playerglobalPosition.rating === PLAYERGLOBAL_PRIMARY_POSITION_RATING,
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
            {...props}
          />
        </Form.Item>
      ))}
    </>
  );
};

export default SquadplanglobalPositionSelects;
