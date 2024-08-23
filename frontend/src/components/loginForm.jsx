/* eslint-disable functional/no-expression-statement */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
          name="username"
          autoComplete="username"
          required
          id="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
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
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        Войти
      </Button>
    </Form>
  );
};
export default LoginForm;
