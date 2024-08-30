/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  setPressedRemoveChannel,
  getPressedRemoveChannel,
  setPressedChannel,
} from '../../slices/uiSlice';
import routes from '../../routes/routes';
import {
  removeChannel,
  getChannelIdToRemove,
  setChannelToRemove,
} from '../../slices/channelSlice';
import { getUserInfo } from '../../slices/userSlice';

const RemoveChannelModal = () => {
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
    const respose = await axios.delete(routes.editChannel(id), {
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
    <Modal show={isPressedRemoveChannel} onHide={handleClickCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClickCloseModal} className="me-2">
            {t('modals.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveChannel(idToRemove)}
          >
            {t('modals.confirm')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
