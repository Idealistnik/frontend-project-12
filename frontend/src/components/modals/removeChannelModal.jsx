import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import axios from 'axios';

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
import routes from '../../routes/routes';

const RemoveChannelModal = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPressedRemoveChannel = useSelector(getPressedRemoveChannel);
  const idToRemove = useSelector(getChannelIdToRemove);
  const [currentToken] = useSelector(getUserInfo);

  const handleClickCloseModal = () => {
    dispatch(setPressedRemoveChannel(false));
  };

  const defaultChannelId = 1;

  const handleRemoveChannel = async (id) => {
    try {
      setSubmitting(true);
      const response = await axios.delete(routes.editChannel(id), {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      const removeId = response.data.id;
      dispatch(removeChannel(removeId));
      dispatch(setPressedChannel(defaultChannelId));
      dispatch(setChannelToRemove(null));
      dispatch(setPressedRemoveChannel(false));
      toast.success(t('channels.removed'));
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      if (e.message === 'Network Error') {
        toast.error(t('errors.network'));
        return;
      }
      toast.error(t('errors.unknown'));
    }
  };

  return (
    <Modal
      show={isPressedRemoveChannel}
      onHide={handleClickCloseModal}
      centered
    >
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={handleClickCloseModal}
            className="me-2"
            disabled={isSubmitting}
          >
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveChannel(idToRemove)}
            disabled={isSubmitting}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
