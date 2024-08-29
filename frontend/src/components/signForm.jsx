/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
/* eslint-disable functional/no-conditional-statement */

import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import setLocale from '../validation/validation';
import {
  fetchSignIn,
  selectorLoadingStatus,
  selectorError,
} from '../slices/userSlice';

const SignForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectorLoadingStatus);
  const error = useSelector(selectorError);
  const errorMessage = error ? error.message : null;

  setLocale();
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
    onSubmit: async (values) => {
      try {
        const data = { username: values.username, password: values.password };
        await dispatch(fetchSignIn(data));
        if (isLoading === 'idle') {
          navigate('/');
        }
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder="Имя пользователя"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.errors.username && formik.touched.username}
          disabled={isLoading === 'loading'}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username ? formik.errors.username : null}
        </Form.Control.Feedback>
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.errors.password && formik.touched.password}
          disabled={isLoading === 'loading'}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password ? formik.errors.password : null}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          name="passwordConfirm"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Подтвердите пароль"
          id="passwordConfirm"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          isInvalid={
            (formik.errors.passwordConfirm && formik.touched.passwordConfirm)
            || isLoading === 'failed'
          }
          disabled={isLoading === 'loading'}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.passwordConfirm
          || (errorMessage === 'Request failed with status code 409'
            ? 'Такой пользователь уже существует'
            : null)}
        </Form.Control.Feedback>
        <Form.Label htmlFor="passwordConfirm">Подтвердите пароль</Form.Label>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={isLoading === 'loading'}
      >
        Зарегистрироваться
      </Button>
      {isLoading === 'loading' ? (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ flexGrow: 1 }}
        >
          <Spinner variant="secondary" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : null}
    </Form>
  );
};
export default SignForm;
