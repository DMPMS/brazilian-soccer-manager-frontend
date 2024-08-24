import { Modal, ModalProps } from 'antd';

interface ModalLogoutProjectProps extends ModalProps {}

const ModalLogoutProject = ({ ...props }: ModalLogoutProjectProps) => {
  return (
    <Modal title="Atenção" okText="Sim" cancelText="Cancelar" {...props}>
      <p>Tem certeza que deseja sair?</p>
    </Modal>
  );
};

export default ModalLogoutProject;
