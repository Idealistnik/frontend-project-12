import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import {
  setPressedRenameChannel,
  getPressedRenameChannel,
} from '../../slices/uiSlice';
import setLocale, { getSchemaChannels } from '../../validation/validation';
import routes from '../../routes/routes';
import {
  renameChannel,
  getChannelIdToRename,
  setChannelToRename,
  channelsSelectors,
} from '../../slices/channelSlice';
import { getUserInfo } from '../../slices/userSlice';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const inputRenameRef = useRef();
  const dispatch = useDispatch();
  const isPressedRenameChannel = useSelector(getPressedRenameChannel);
  const idToRename = useSelector(getChannelIdToRename);
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const currentChannel = useSelector((state) => {
    if (idToRename !== null) {
      return channelsSelectors.selectById(state, idToRename);
    }
    return null;
  });
  const channelName = currentChannel ? currentChannel.name : '';
  const [currentToken] = useSelector(getUserInfo);

  const handleClickCloseModal = () => {
    dispatch(setPressedRenameChannel(false));
    dispatch(setChannelToRename(null));
  };
  setLocale(t);
  const schema = getSchemaChannels(channelsNames);
  const formik = useFormik({
    initialValues: {
      inputValue: channelName,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const currentValue = values.inputValue;
      const editedChannel = { name: currentValue };
      try {
        const response = await axios.patch(
          routes.editChannel(idToRename),
          editedChannel,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          },
        );
        const currentId = response.data.id;
        const currentName = response.data.name;
        dispatch(
          renameChannel({ id: currentId, changes: { name: currentName } }),
        );
        dispatch(setChannelToRename(null));
        resetForm();
        dispatch(setPressedRenameChannel(false));
        handleClickCloseModal();
        toast.success(t('channels.renamed'));
      } catch (e) {
        if (e.message === 'Network Error') {
          toast.error(t('errors.network'));
          return;
        }
        toast.error(t('errors.unknown'));
      }
    },
  });

  useEffect(() => {
    const getSelected = () => {
      setTimeout(() => {
        if (isPressedRenameChannel) {
          inputRenameRef.current.select();
          inputRenameRef.current.focus();
        }
      });
    };
    getSelected();
  }, [isPressedRenameChannel]);

  if (channelName) {
    return (
      <Modal
        show={isPressedRenameChannel}
        onHide={handleClickCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label visuallyHidden htmlFor="inputValue">
                {t('modals.channelName')}
              </Form.Label>
              <Form.Control
                ref={inputRenameRef}
                type="text"
                name="inputValue"
                id="inputValue"
                autoFocus
                required
                value={formik.values.inputValue}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                autoComplete="off"
                isInvalid={
                  formik.errors.inputValue && formik.touched.inputValue
                }
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
            {t('modals.cancel')}
          </Button>
          <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
            {t('modals.submit')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return null;
};

export default RenameChannelModal;
