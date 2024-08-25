/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable react/jsx-one-expression-per-line */

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { getUserInfo } from '../slices/userSlice';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import { setChannels, channelsSelectors } from '../slices/channelSlice';
import {
  setMessages,
  messagesSelectors,
  addMessage,
} from '../slices/messagesSlice';
import { getPressedChannelId } from '../slices/uiSlice';

const Messages = () => {
  const messagesList = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(getPressedChannelId);
  const channelMessagesList = messagesList.filter(
    (message) => +message.channelId === currentChannelId
  );
  const messagesCount = _.size(channelMessagesList);

  const [currentToken, currentUser] = useSelector(getUserInfo);
  // const channelList = useSelector(channelsSelectors.selectAll);
  const inputRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    inputRef.current.focus();
  });
  // localStorage.clear();
  const formik = useFormik({
    initialValues: {
      inputValue: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
          body: values.inputValue,
          channelId: currentChannelId,
          username: currentUser,
        };
        const response = await axios.post('/api/v1/messages', newMessage, {
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
    if (localStorage.length > 0) {
      const getMessages = async () => {
        const response = await axios.get('/api/v1/messages', {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
        return response.data;
      };
      getMessages().then((data) => dispatch(setMessages(data)));
    }
  }, [dispatch, currentToken]);

  const vdom = (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">{messagesCount} сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {channelMessagesList.map(({ body, username, id }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>: {body}
            </div>
          ))}
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
                name="inputValue"
                aria-label="Новое сообщение"
                className="border-0 p-0 ps-2"
                required
                id="username"
                type="text"
                placeholder="Введите сообщение..."
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
                <ArrowRightSquare />
                <span className="visually-hidden">Отправить</span>
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
