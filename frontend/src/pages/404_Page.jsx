import { useTranslation } from 'react-i18next';
import Header from '../components/header';
import BodyContainer from '../components/bodyContainer';
import wrongUrl from '../images/404.svg';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <BodyContainer>
      <Header />
      <div className="text-center">
        <img
          src={wrongUrl}
          className="img-fluid h-25"
          alt="Страница не найдена"
        />
        <h1 className="h4 text-muted">{t('notFound.header')}</h1>
        <p className="text-muted">
          {t('notFound.message')}
          <a href="/">{t('notFound.linkText')}</a>
        </p>
      </div>
    </BodyContainer>
  );
};

export default Page404;
