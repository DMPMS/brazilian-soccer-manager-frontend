import Screen from '../../../shared/components/screen/Screen';
import { ManagerglobalRoutesEnum } from '../routes';

const ManagerglobalInsert = () => {
  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'PÁGINA INICIAL',
        },
        {
          name: 'TREINADORES',
          navigateTo: ManagerglobalRoutesEnum.MANAGERGLOBAL,
        },
        {
          name: 'INSERIR TREINADOR',
        },
      ]}
    >
      Inserir treinador
    </Screen>
  );
};

export default ManagerglobalInsert;
