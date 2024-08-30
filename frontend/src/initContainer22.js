/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable react/jsx-one-expression-per-line */

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import io from 'socket.io-client';
import App from './App';
import {
  addMessage,
  addSocket,
} from './slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelSlice';
import { setPressedChannel } from './slices/uiSlice';
import resources from './locales/index';

const InitContainer = () => {
  i18n
    .use(initReactI18next)
    .init({
      debug: true,
      resources, // передаем переводы текстов интерфейса в формате JSON
      fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
      interpolation: {
        escapeValue: false,
      },
    });

  const dispatch = useDispatch();
  const defaultChannelId = 1;

  useEffect(() => {
    const socket = io('http://localhost:3000');

    dispatch(addSocket(socket));

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
      dispatch(setPressedChannel(defaultChannelId));
    });
    socket.on('renameChannel', (payload) => {
      const currentId = payload.id;
      const currentName = payload.name;
      dispatch(renameChannel({ id: currentId, changes: { name: currentName } }));
    });

    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default InitContainer;
