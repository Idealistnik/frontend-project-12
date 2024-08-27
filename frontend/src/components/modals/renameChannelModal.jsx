/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
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

const RenameChannelModal = () => {
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

  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const currentValue = values.inputValue;
      const editedChannel = { name: currentValue };
      try {
        const response = await axios.post('/api/v1/channels', editedChannel, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        dispatch(addChannel(response.data));
        dispatch(setPressedChannel(+response.data.id));
        resetForm();
        handleClickCloseModal(); // Закрываем модальное окно после успешной отправки формы
      } catch (e) {
        console.error(e);
      }
    },
  });


  return (
    <Modal show={isPressedRemoveChannel} onHide={handleClickCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label visuallyHidden>Имя канала</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={formik.values.inputValue}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClickCloseModal}>
          Отменить
        </Button>
        <Button
          variant="primary"
          onClick={() => handleRemoveChannel(idToRemove)}
        >
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;
