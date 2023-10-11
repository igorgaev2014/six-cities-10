import { Reviews } from './../types/reviews';
import { AuthStatus } from './../const';
import { Offer, Offers } from './../types/offers';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers, changeSort, loadOffers, setOffer, setOffersLoadingStatus, setAuthStatus, setError, setUserInfo, setOffersNearby, setOfferReviews, setPostReviewStatus, setOfferLoadingStatus } from './action';


type InitialState = {
  city: string;
  offer: Offer | null;
  offers: Offers;
  sort: string;
  isOffersLoading: boolean;
  authStatus: AuthStatus;
  error: string | null;
  userInfo: string | null;
  offersNearby: Offers | [];
  reviews: Reviews | [];
  reviewPosted: boolean;
  isOfferLoading: boolean;
}

const initialState: InitialState = {
  city: 'Paris',
  offer: null,
  offers: [],
  sort: 'Popular',
  isOffersLoading: true,
  authStatus: AuthStatus.Unknown,
  error: null,
  userInfo: null,
  offersNearby: [],
  reviews: [],
  reviewPosted: false,
  isOfferLoading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
    })
    .addCase(fillOffers, (state, action) => {
      const {cityOffers} = action.payload;
      state.offers = cityOffers;
    })
    .addCase(changeSort, (state, action) => {
      const {sort} = action.payload;
      state.sort = sort;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setOfferReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setPostReviewStatus, (state, action) => {
      state.reviewPosted = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    });
});

export {reducer};
