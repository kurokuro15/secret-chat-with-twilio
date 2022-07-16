import UserDataForm from './auth/UserDataForm';
import Modal from './Modal';

export default function WelcomeModal({ show }: { show: boolean }) {
  return (
    <Modal show={show}>
      <Modal.Header>¡Bienvenido a SecretChat!</Modal.Header>
      <Modal.Body>
        <p className="mb-3">Parece que eres nuevo por aquí... ¿Cómo quieres que te llamen?</p>
        <UserDataForm />
      </Modal.Body>
    </Modal>
  );
}
