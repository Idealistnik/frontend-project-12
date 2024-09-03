import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  fetchLogin,
  selectorLoadingStatus,
} from '../slices/userSlice';

const LoginForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const isLoading = useSelector(selectorLoadingStatus);
  const inputref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    inputref.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        await dispatch(fetchLogin(values))
          .unwrap();
        navigate('/');
      } catch (error) {
        setAuthFailed(true);
        inputref.current.select();
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('login.submit')}</h1>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          ref={inputref}
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder={t('login.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
          disabled={isLoading === 'loading'}
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
          isInvalid={authFailed}
          disabled={isLoading === 'loading'}
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
        disabled={isLoading === 'loading'}
      >
        {t('login.submit')}
      </Button>
      {isLoading === 'loading' ? (
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
