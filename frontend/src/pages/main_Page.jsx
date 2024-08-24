/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */

import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import cn from 'classnames';
import Header from '../components/header';
import BodyContainer from '../components/bodyContainer';
import { setChannels, channelsSelectors } from '../slices/channelSlice';
import { setMessages } from '../slices/messagesSlice';

const MainPage = () => {
  const channelList = useSelector(channelsSelectors.selectAll);
  // const messagesList = useSelector(messagesSelectors.selectAll);

  // const defaultId = channelList?.id;
  // console.log(defaultId);
  const [active, setActive] = useState(null);

  // useEffect(() => {
  //   const generalChannel = channelList.find(
  //     (channel) => channel.name === 'general',
  //   );
  //   setActive(generalChannel.id);
  // }, [channelList]);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // localStorage.clear();

  useEffect(() => {
    if (localStorage.length > 0) {
      const currentToken = localStorage.admin;
      // console.log(localStorage);
      const getChannels = async () => {
        const response = await axios.get('/api/v1/channels', {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        return response.data;
      };

      const getMessages = async () => {
        const response = await axios.get('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        return response.data;
      };

      getChannels().then((data) => dispatch(setChannels(data)));
      getMessages().then((data) => dispatch(setMessages(data)));
    }
  }, [dispatch]);

  const handleClasses = (id) => {
    const btnClass = cn('w-100 rounded-0 text-start', {
      'btn-secondary': active === id,
    });
    return btnClass;
  };

  const handleClick = (id) => {
    setActive(id);
  };

  const vdom = (
    <BodyContainer>
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
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
                    onClick={() => handleClick(id)}
                    className={handleClasses(id)}
                  >
                    <span className="me-1">#</span>
                    {name}
                  </Button>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </div>
      </div>
    </BodyContainer>
  );

  return localStorage.length === 0 ? null : vdom;
};

export default MainPage;
