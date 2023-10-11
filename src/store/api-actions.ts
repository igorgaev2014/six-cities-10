// import { AppRoute } from './../const';
import { Reviews } from './../types/reviews';
import { Offer, Offers } from './../types/offers';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { loadOffers, setOffer, setOffersLoadingStatus, setAuthStatus, setError, setUserInfo, setOffersNearby, setOfferReviews, setPostReviewStatus, setOfferLoadingStatus, redirectToRoute } from './action';
import {APIRoute, AppRoute, AuthStatus, TIMEOUT_SHOW_ERROR} from '../const';
import { dropToken, saveToken } from '../services/token';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {PostData} from '../types/post-data';
import {store} from './';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    try {
      const response = await api.get<Offers>(APIRoute.Offers);
      const {data} = response;
      dispatch(loadOffers(data));
      dispatch(setOffersLoadingStatus(false));
    } catch {
      dispatch(redirectToRoute(AppRoute.Error404));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get(APIRoute.Login);
      dispatch(setAuthStatus(AuthStatus.Auth));
      dispatch(setUserInfo(data.email));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
      dispatch(setUserInfo(null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserInfo(email));
    dispatch(setAuthStatus(AuthStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserInfo(null));
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  }
);

export const setOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setOffer',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(setOfferLoadingStatus(true));
      dispatch(setOffer(data));
      dispatch(setOfferLoadingStatus(false));
    } catch {
      dispatch(redirectToRoute(AppRoute.Error404));
    }
  },
);

export const setOffersNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setOffersNearby',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOffersNearby(data));
  },
);

export const setOfferReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setOfferReviews',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
    dispatch(setOfferReviews(data));
  },
);

export const addReviewAction = createAsyncThunk<void, PostData, {
  dispatch: AppDispatch, state: State, extra: AxiosInstance
}>(
  'addComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    try {
      dispatch(setPostReviewStatus(true));
      const response = await api.post<Reviews>(`${APIRoute.Reviews}/${id}`, {comment, rating});
      dispatch(setOfferReviews(response.data));
      dispatch(setPostReviewStatus(false));
    }
    catch {
      dispatch(setPostReviewStatus(false));
    }
  },
);
