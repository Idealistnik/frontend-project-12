import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import setLocale, { getSchemaChannels } from '../../validation/validation';
import routes from '../../routes/routes';
import {
  getPressedAddChannel,
  setPressedAddChannel,
  setPressedChannel,
} from '../../slices/uiSlice';
import { getUserInfo } from '../../slices/userSlice';
import { channelsSelectors, addChannel } from '../../slices/channelSlice';

const AddChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPressedAddChannel = useSelector(getPressedAddChannel);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const [currentToken] = useSelector(getUserInfo);
  const handleClickCloseModal = () => {
    dispatch(setPressedAddChannel(false));
  };
  setLocale(t);
  const schema = getSchemaChannels(channelsNames);
  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const currentValue = leoProfanity.clean(values.inputValue);
      const newChannel = { name: currentValue };
      try {
        const response = await axios.post(routes.channels(), newChannel, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        dispatch(addChannel(response.data));
        dispatch(setPressedChannel(+response.data.id));
        resetForm();
        handleClickCloseModal();
        toast.success(t('channels.created'));
      } catch (e) {
        if (e.message === 'Network Error') {
          toast.error(t('errors.network'));
          return;
        }
        toast.error(t('errors.unknown'));
      }
    },
  });

  return (
    <Modal show={isPressedAddChannel} onHide={handleClickCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label visuallyHidden htmlFor="inputValue">
              {t('modals.channelName')}
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
        <Button
          variant="secondary"
          onClick={handleClickCloseModal}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          className="me-2"
          type="submit"
          variant="primary"
          onClick={formik.handleSubmit}
        >
          {t('modals.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddChannelModal;
