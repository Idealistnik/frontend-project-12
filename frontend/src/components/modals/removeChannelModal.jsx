/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  setPressedRemoveChannel,
  getPressedRemoveChannel,
  setPressedChannel,
} from '../../slices/uiSlice';
import {
  removeChannel,
  getChannelIdToRemove,
  setChannelToRemove,
} from '../../slices/channelSlice';
import { getUserInfo } from '../../slices/userSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const isPressedRemoveChannel = useSelector(getPressedRemoveChannel);
  const idToRemove = useSelector(getChannelIdToRemove);
  const [currentToken] = useSelector(getUserInfo);

  const handleClickCloseModal = () => {
    dispatch(setPressedRemoveChannel(false));
  };
  const defaultChannelId = 1;
  const handleRemoveChannel = async (id) => {
    const respose = await axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    const removeId = respose.data.id;
    dispatch(removeChannel(removeId));
    dispatch(setPressedChannel(defaultChannelId));
    dispatch(setChannelToRemove(null));
    dispatch(setPressedRemoveChannel(false));
  };

  return (
    <Modal show={isPressedRemoveChannel} onHide={handleClickCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClickCloseModal}>
          Отменить
        </Button>
        <Button
          variant="primary"
          onClick={() => handleRemoveChannel(idToRemove)}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
