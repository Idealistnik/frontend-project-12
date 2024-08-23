import Card from 'react-bootstrap/Card';
import Header from '../components/header';
import LoginForm from '../components/loginForm';
import BodyContainer from '../components/bodyContainer';
import login from '../images/login.jpeg';

const LoginPage = () => (
  <BodyContainer>
    <Header />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={login}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup"> Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  </BodyContainer>
);

export default LoginPage;
