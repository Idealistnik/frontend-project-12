/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserInfo, setLoggedIn, setUserInfoToStorage } from '../slices/userSlice';

const LoginForm = () => {
  // const [users, setUser] = useState([]);
  const [authFailed, setAuthFailed] = useState(false);
  const inputref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const currentLocation = location.pathname;
  // console.log(location);
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
        const response = await axios.post('/api/v1/login', values);
        dispatch(setUserInfoToStorage(response.data));
        dispatch(setUserInfo(response.data));
        dispatch(setLoggedIn());
        navigate('/');
      } catch (error) {
        setAuthFailed(true);
        inputref.current.select();
        console.error(error);
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="mb-3 form-floating">
        <Form.Control
          ref={inputref}
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        Войти
      </Button>
    </Form>
  );
};
export default LoginForm;
