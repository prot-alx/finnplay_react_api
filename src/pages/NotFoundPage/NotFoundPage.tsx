import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};
