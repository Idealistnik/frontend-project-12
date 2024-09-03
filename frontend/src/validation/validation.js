/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */
import * as yup from 'yup';

const setLocale = (t) => {
  yup.setLocale({
    mixed: {
      required: t('modals.required'),
      notOneOf: t('modals.uniq'),
      oneOf: t('signup.mustMatch'),
    },
    string: {
      // min: ({ min }) =>
      // min === 3
      //   ? t('signup.usernameConstraints')
      //   : t('signup.passMin'),
      min: ({ min }) => {
        if (min === 3) {
          return t('signup.usernameConstraints');
        }
        return t('signup.passMin');
      },
      max: t('signup.usernameConstraints'),
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
