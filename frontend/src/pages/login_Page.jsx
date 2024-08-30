import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import Header from '../components/header';
import LoginForm from '../components/loginForm';
import BodyContainer from '../components/bodyContainer';
import login from '../images/login.jpeg';
import { selectorLoadingStatus } from '../slices/userSlice';

const LoginPage = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(selectorLoadingStatus);
  const handleResetLocalStorage = () => localStorage.clear();
  return (
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
                    alt={t('login.submit')}
                  />
                </div>
                <LoginForm />
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('login.newToChat')}</span>
                  <a
                    href="/signup"
                    disabled={isLoading === 'loading'}
                    onClick={handleResetLocalStorage}
                  >
                    {t('login.signup')}
                  </a>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </BodyContainer>
  );
};

export default LoginPage;
