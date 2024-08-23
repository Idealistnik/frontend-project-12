import Header from '../components/header';
import BodyContainer from '../components/bodyContainer';
import wrongUrl from '../images/404.svg';

const Page404 = () => (
  <BodyContainer>
    <Header />
    <div className="text-center">
      <img
        src={wrongUrl}
        className="img-fluid h-25"
        alt="Страница не найдена"
      />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </BodyContainer>
);

export default Page404;
