/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import * as yup from 'yup';

const setLocale = () => {
  yup.setLocale({
    mixed: {
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
      oneOf: 'Пароли должны совпадать',
    },
    string: {
      min: ({ min }) =>
        min === 3 ? 'От 3 до 20 символов' : 'Не менее 6 символов',
      max: 'От 3 до 20 символов',
    },
  });
};

export const getSchemaChannels = (channelsNames) => {
  const schema = yup.object().shape({
    inputValue: yup.string().required().min(3).max(20)
      .notOneOf(channelsNames),
  });
  return schema;
};

export default setLocale;
