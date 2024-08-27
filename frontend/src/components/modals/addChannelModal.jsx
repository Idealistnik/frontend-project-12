/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import { getPressedAddChannel, setPressedAddChannel, setPressedChannel } from '../../slices/uiSlice';
import { getUserInfo } from '../../slices/userSlice';
import { channelsSelectors, addChannel } from '../../slices/channelSlice';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const isPressedAddChannel = useSelector(getPressedAddChannel);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  // console.log(channels);

  const [currentToken] = useSelector(getUserInfo);
  const handleClickCloseModal = () => {
    dispatch(setPressedAddChannel(false));
  };

  yup.setLocale({
    mixed: {
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
    },
    string: {
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
    },
  });

  const schema = yup.object().shape({
    inputValue: yup.string().required().min(3).max(20)
      .notOneOf(channelsNames),
  });

  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const currentValue = values.inputValue;
      const newChannel = { name: currentValue };
      try {
        const response = await axios.post('/api/v1/channels', newChannel, {
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

  useEffect(() => {
    if (!isPressedAddChannel) {
      formik.resetForm();
    }
  }, [isPressedAddChannel]);

  return (
    <Modal
      show={isPressedAddChannel}
      onHide={handleClickCloseModal}
      className="modal-dialog-centered"
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label visuallyHidden htmlFor="inputValue">
              Имя канала
            </Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              name="inputValue"
              id="inputValue"
              autoFocus
              required
              onChange={formik.handleChange}
              value={formik.values.inputValue}
              onBlur={formik.handleBlur}
              autoComplete="off"
              isInvalid={formik.errors.inputValue && formik.touched.inputValue}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.inputValue && formik.touched.inputValue
                ? formik.errors.inputValue
                : null}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClickCloseModal}>
          Отменить
        </Button>
        <Button
          className="me-2"
          type="submit"
          variant="primary"
          onClick={formik.handleSubmit}
        >
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddChannelModal;
