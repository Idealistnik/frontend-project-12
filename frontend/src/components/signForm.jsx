import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import setLocale from '../validation/validation';
import {
  fetchSignIn,
  selectorError,
} from '../slices/userSlice';
import routes from '../routes/routes';

const SignForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectorError);

  setLocale(t);
  const schema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null]),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = { username: values.username, password: values.password };
      await dispatch(fetchSignIn(data)).unwrap();
      navigate(routes.mainPage());
    },
  });
  useEffect(() => {
    if (error) {
      if (error === 'Network Error') {
        toast.error(t('errors.network'));
      } else if (error !== 409) {
        toast.error(t('errors.unknown'));
      }
    }
  }, [error, t]);

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder={t('signup.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.errors.username && formik.touched.username}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username ? formik.errors.username : null}
        </Form.Control.Feedback>
        <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t('signup.password')}
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.errors.password && formik.touched.password}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password ? formik.errors.password : null}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="passwordConfirm"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t('signup.confirm')}
          id="passwordConfirm"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          isInvalid={
            (formik.errors.passwordConfirm && formik.touched.passwordConfirm)
            || error === 409
          }
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.passwordConfirm
            || (error === 409
              ? t('signup.alreadyExists')
              : null)}
        </Form.Control.Feedback>
        <Form.Label htmlFor="passwordConfirm">{t('signup.confirm')}</Form.Label>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('signup.submit')}
      </Button>
      {formik.isSubmitting ? (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ flexGrow: 1 }}
        >
          <Spinner variant="secondary" animation="border" role="status">
            <span className="visually-hidden">{t('loading')}</span>
          </Spinner>
        </div>
      ) : null}
    </Form>
  );
};
export default SignForm;
