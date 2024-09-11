const host = '/api/v1';

export default {
  login: () => [host, 'login'].join('/'),
  signup: () => [host, 'signup'].join('/'),
  channels: () => [host, 'channels'].join('/'),
  editChannel: (id) => [host, 'channels', id].join('/'),
  messages: () => [host, 'messages'].join('/'),
  mainPage: () => '/',
  signupPage: () => '/signup',
  loginPage: () => '/login',
  page404: () => '*',
};
