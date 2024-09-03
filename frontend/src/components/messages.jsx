/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable react/jsx-one-expression-per-line */

import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { getUserInfo, selectorLoggedIn } from '../slices/userSlice';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { setChannels, channelsSelectors } from '../slices/channelSlice';
import {
  setMessages,
  messagesSelectors,
  addMessage,
  fetchMessages,
} from '../slices/messagesSlice';
import routes from '../routes/routes';
import { channelsSelectors } from '../slices/channelSlice';
import { getPressedChannelId } from '../slices/uiSlice';

const Messages = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectorLoggedIn);
  const messagesList = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(getPressedChannelId);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));
  const currentChannelName = currentChannel?.name;
  const isLoading = useSelector((state) => state.messages.loadingStatus);
  const channelMessagesList = messagesList
    .filter((message) => +message.channelId === currentChannelId);
  const messagesCount = _.size(channelMessagesList);
  const [currentToken, currentUser] = useSelector(getUserInfo);
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    inputRef.current.focus();
  });
  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
          body: leoProfanity.clean(values.inputValue),
          channelId: currentChannelId,
          username: currentUser,
        };
        const response = await axios.post(routes.messages(), newMessage, {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        resetForm();
        dispatch(addMessage(response.data));
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMessages(currentToken)).then((data) => dispatch(setMessages(data)));
    }
  }, [dispatch, currentToken, isLoggedIn]);

  const vdom = (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannelName}</b>
          </p>
          <span className="text-muted">{t('chat.messageCount', { count: messagesCount })}</span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {isLoading === 'loading' ? (
            <div
              className="d-flex justify-content-center align-items-center w-100"
              style={{ flexGrow: 1 }}
            >
              <Spinner variant="secondary" animation="border" role="status">
                <span className="visually-hidden">{t('loading')}</span>
              </Spinner>
            </div>
          ) : (
            <ScrollToBottom className="h-100">
              {channelMessagesList.map(({ body, username, id }) => (
                <div key={id} className="text-break mb-2">
                  <b>{username}</b>: {body}
                </div>
              ))}
            </ScrollToBottom>
          )}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            className="py-1 border rounded-2"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="input-group has-validation">
              <Form.Control
                ref={inputRef}
                aria-label={t('chat.inputMessage')}
                name="inputValue"
                className="border-0 p-0 ps-2"
                required
                id="username"
                type="text"
                placeholder={t('chat.inputMessage')}
                onChange={formik.handleChange}
                value={formik.values.inputValue}
                autoComplete="off"
              />
              <Button
                type="submit"
                variant=""
                className="btn-group-vertical"
                disabled={formik.values.inputValue === ''}
              >
                <ArrowRightSquare width="20" height="20" />
                <span className="visually-hidden">{t('chat.send')}</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );

  return localStorage.length === 0 ? null : vdom;
};

export default Messages;
