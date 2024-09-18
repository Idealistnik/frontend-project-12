import { useTranslation } from 'react-i18next';
// import leoProfanity from 'leo-profanity';
import { Spinner } from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';
// import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import _ from 'lodash';
import { getUserInfo, selectorLoggedIn } from '../slices/userSlice';
import {
  setMessages,
  messagesSelectors,
  fetchMessages,
} from '../slices/messagesSlice';
// import routes from '../routes/routes';
import { channelsSelectors } from '../slices/channelSlice';
import {
  getPressedChannelId,
  getPressedAddChannel,
  getPressedRemoveChannel,
  getPressedRenameChannel,
} from '../slices/uiSlice';
import MessageForm from './messageForm';

const Messages = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(selectorLoggedIn);
  const messagesList = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(getPressedChannelId);
  const isPressedAddChannel = useSelector(getPressedAddChannel);
  const isPressedRemoveChannel = useSelector(getPressedRemoveChannel);
  const isPressedRenameChannel = useSelector(getPressedRenameChannel);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));
  const currentChannelName = currentChannel?.name;
  const isLoading = useSelector((state) => state.messages.loadingStatus);
  const channelMessagesList = messagesList
    .filter((message) => +message.channelId === currentChannelId);
  const messagesCount = _.size(channelMessagesList);
  const [currentToken, currentUser] = useSelector(getUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(currentToken)).then((data) => dispatch(setMessages(data)));
  }, [dispatch, currentToken, isLoggedIn]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #&nbsp;
              {currentChannelName}
            </b>
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
                  <b>{username}</b>
                  :&nbsp;
                  {body}
                </div>
              ))}
            </ScrollToBottom>
          )}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm
            currentToken={currentToken}
            currentChannelId={currentChannelId}
            currentUser={currentUser}
            channelMessagesList={channelMessagesList}
            isPressedAddChannel={isPressedAddChannel}
            isPressedRemoveChannel={isPressedRemoveChannel}
            isPressedRenameChannel={isPressedRenameChannel}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
