import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header.jsx';
import SignForm from '../components/SignForm.jsx';
import BodyContainer from '../components/BodyContainer.jsx';
import signup from '../images/signup.jpg';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <BodyContainer>
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img
                    src={signup}
                    className="rounded-circle"
                    alt={t('signup.header')}
                  />
                </div>
                <SignForm />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </BodyContainer>
  );
};

export default SignUpPage;
