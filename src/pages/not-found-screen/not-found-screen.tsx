import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page">
      <main className="page__main">
        <section>
          <h1>404. Page not found</h1>
          <Link to="/">Вернуться на главную</Link>
        </section>
      </main>
    </div>
  );
}

export default NotFoundScreen;
