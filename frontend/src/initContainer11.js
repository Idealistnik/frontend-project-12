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

const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      debug: true,
      resources, // передаем переводы текстов интерфейса в формате JSON
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
};
const initSocket = (dispatch, defaultChannelId) => {
  const newSocket = new Promise((resolve, reject) => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      dispatch(addSocket(socket)); // если все не внутри connect то раньше закрывалось
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
      resolve(socket);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection failed:', error);
      reject(socket);
    });
  });
  return newSocket;
};

const InitContainer = () => {
  const dispatch = useDispatch();
  const defaultChannelId = 1;

  useEffect(() => {
    initI18n();
    const getSocket = async () => {
      try {
        const socket = await initSocket(dispatch, defaultChannelId);
        return () => {
          socket.disconnect();
        };
      } catch (e) {
        console.error(e);
        return e;
      }
    };
    getSocket();
  }, [dispatch]);

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default InitContainer;
