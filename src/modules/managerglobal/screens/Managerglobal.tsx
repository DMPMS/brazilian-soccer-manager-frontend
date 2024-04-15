import { useGlobalContext } from '../../../shared/hooks/useGlobalContext';

const Managerglobal = () => {
  const { user } = useGlobalContext();

  return <div>{`Managerglobal ${user?.name}`}</div>;
};

export default Managerglobal;
