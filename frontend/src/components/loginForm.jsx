import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import {
  fetchLogin,
  selectorError,
} from '../slices/userSlice';
import routes from '../routes/routes';

const LoginForm = () => {
  const { t } = useTranslation();
  const error = useSelector(selectorError);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (error) {
      inputRef.current.select();
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      await dispatch(fetchLogin(values))
        .unwrap();
      navigate(routes.mainPage());
    },
  });

  useEffect(() => {
    if (error) {
      if (error === 'Network Error') {
        toast.error(t('errors.network'));
      } else if (error !== 401) {
        toast.error(t('errors.unknown'));
      }
    }
  }, [error, t]);

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('login.submit')}</h1>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          ref={inputRef}
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder={t('login.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={error === 401}
          disabled={formik.isSubmitting}
        />
        <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t('login.password')}
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={error === 401}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {t('login.authFailed')}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('login.submit')}
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
export default LoginForm;
