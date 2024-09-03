/* eslint-disable react/jsx-one-expression-per-line */

import { Provider } from 'react-redux';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import io from 'socket.io-client';
import App from './App';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
} from './slices/channelSlice';
import { setPressedChannel } from './slices/uiSlice';
import resources from './locales/index';
import store from './slices/index';

const englishWords = leoProfanity.getDictionary('en');
const russianWords = leoProfanity.getDictionary('ru');
const combinedWords = [...englishWords, ...russianWords];
leoProfanity.add(combinedWords);

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      debug: true,
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const defaultChannelId = 1;

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
    store.dispatch(setPressedChannel(defaultChannelId));
  });
  socket.on('renameChannel', (payload) => {
    const currentId = payload.id;
    const currentName = payload.name;
    store.dispatch(renameChannel({ id: currentId, changes: { name: currentName } }));
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;
