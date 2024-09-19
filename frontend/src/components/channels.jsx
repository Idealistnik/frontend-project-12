import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import axios from 'axios';

import {
  setChannels,
  channelsSelectors,
} from '../slices/channelSlice';
import { getUserInfo } from '../slices/userSlice';
import { setPressedAddChannel } from '../slices/uiSlice';
import routes from '../routes/routes';
import Channel from './channel';

const Channels = () => {
  const { t } = useTranslation();
  const channelList = useSelector(channelsSelectors.selectAll);
  const [currentToken] = useSelector(getUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChannels = async () => {
      const response = await axios.get(routes.channels(), {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      return response.data;
    };
    getChannels().then((data) => dispatch(setChannels(data)));
  }, [dispatch, currentToken]);

  const handleClickAddChannel = () => {
    dispatch(setPressedAddChannel(true));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          variant=""
          className="text-primary btn-group-vertical p-0"
          onClick={handleClickAddChannel}
        >
          <PlusSquare width="20" height="20" />
          <span className="visually-hidden">{t('channels.plus')}</span>
        </Button>
      </div>
      <Nav
        as="ul"
        id="channels-box"
        variant="pills"
        defaultActiveKey=""
        className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelList.map((channel) => (
          <Channel key={channel.id} t={t} channel={channel} />
        ))}
      </Nav>
    </div>
  );
};

export default Channels;
