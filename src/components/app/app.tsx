import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingLayout from '../loading-layout/loading-layout';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { AuthStatus } from '../../const';

const isCheckedAuth = (authStatus: AuthStatus): boolean =>
  authStatus === AuthStatus.Unknown;

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector((state) => state.isOffersLoading);
  const authStatus = useAppSelector((state) => state.authStatus);

  if (isCheckedAuth(authStatus) && isOffersDataLoading) {
    return (
      <LoadingLayout />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />}/>
        <Route path={AppRoute.Login} element={<LoginScreen/>}/>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={`${AppRoute.Room}/:id`} element={<RoomScreen />}/>
        <Route path="*" element={<NotFoundScreen/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
