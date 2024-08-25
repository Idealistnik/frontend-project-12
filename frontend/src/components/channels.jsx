/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PlusSquare } from 'react-bootstrap-icons';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { setChannels, channelsSelectors } from '../slices/channelSlice';
import { getUserInfo, selectorLoggedIn } from '../slices/userSlice';
import { setPressedChannel, getPressedChannelId } from '../slices/uiSlice';

const Channels = () => {
  const isLoggedIn = useSelector(selectorLoggedIn);
  const channelList = useSelector(channelsSelectors.selectAll);
  const [currentToken] = useSelector(getUserInfo);
  const currentChannelId = useSelector(getPressedChannelId);
  const dispatch = useDispatch();
  // localStorage.clear();

  useEffect(() => {
    if (isLoggedIn) {
      const getChannels = async () => {
        const response = await axios.get('/api/v1/channels', {
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

  const vdom = (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="" className="text-primary btn-group-vertical p-0">
          <PlusSquare />
          <span className="visually-hidden">+</span>
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
            <Button
              variant={currentChannelId === +id ? 'secondary' : ''}
              onClick={() => handleClick(id)}
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              {name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );

  return localStorage.length === 0 ? null : vdom;
};

export default Channels;
