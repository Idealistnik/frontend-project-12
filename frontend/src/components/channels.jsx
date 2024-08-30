/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PlusSquare } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import {
  setChannels,
  channelsSelectors,
  setChannelToRemove,
  setChannelToRename,
} from '../slices/channelSlice';
import { getUserInfo, selectorLoggedIn } from '../slices/userSlice';
import routes from '../routes/routes';
import {
  setPressedChannel,
  getPressedChannelId,
  setPressedAddChannel,
  setPressedRemoveChannel,
  setPressedRenameChannel,
} from '../slices/uiSlice';

const Channels = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectorLoggedIn);
  const channelList = useSelector(channelsSelectors.selectAll);
  const [currentToken] = useSelector(getUserInfo);
  const currentChannelId = useSelector(getPressedChannelId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      const getChannels = async () => {
        const response = await axios.get(routes.channels(), {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        return response.data;
      };
      getChannels().then((data) => dispatch(setChannels(data)));
    }
  }, [dispatch, channelList, currentToken, isLoggedIn]);

  const handleClick = (id) => {
    dispatch(setPressedChannel(+id));
  };

  const handleClickAddChannel = () => {
    dispatch(setPressedAddChannel(true));
  };

  const handleRemoveChannel = (currentId) => {
    dispatch(setPressedRemoveChannel(true));
    dispatch(setChannelToRemove(+currentId));
  };

  const handleRenameChannel = (currentId) => {
    dispatch(setPressedRenameChannel(true));
    dispatch(setChannelToRename(+currentId));
  };

  const vdom = (
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
        {channelList.map(({ id, name }) => (
          <Nav.Item as="li" key={id} className="w-100">
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                variant={currentChannelId === +id ? 'secondary' : ''}
                onClick={() => handleClick(id)}
                className="w-100 rounded-0 text-start text-truncate"
              >
                <span className="me-1">#</span>
                {name}
              </Button>

              {+id === 1 || +id === 2 ? null : (
                <>
                  <Dropdown.Toggle
                    split
                    variant={currentChannelId === +id ? 'secondary' : ''}
                    id="dropdown-split-basic"
                    className="flex-grow-0"
                  >
                    <span className="visually-hidden">{t('channels.menu')}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleRemoveChannel(id)}
                    >
                      {t('channels.remove')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleRenameChannel(id)}
                    >
                      {t('channels.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );

  return localStorage.length === 0 ? null : vdom;
};

export default Channels;
