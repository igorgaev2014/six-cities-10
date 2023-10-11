import Logo from '../../components/logo/logo';
import { Offer } from '../../types/offers';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import CitiesCardList from '../../components/cities-card-list/cities-card-list';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Map from '../../components/map/map';
import {useAppSelector, useAppDispatch} from '../../hooks';
import Navigation from '../../components/navigation/navigation';
import { setOfferReviewsAction, setOffersNearbyAction } from '../../store/api-actions';
import { setOfferAction } from '../../store/api-actions';
import { AuthStatus } from '../../const';
import LoadingLayout from '../../components/loading-layout/loading-layout';

function RoomScreen(): JSX.Element {
  const params = useParams();
  const id = Number(params.id);
  const {offers, offersNearby, offer, isOfferLoading, authStatus} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  let offersNearbyMap = offersNearby;
  if (offers[0] !== undefined) {
    offersNearbyMap = [...offersNearby, offers[0]];
  }

  useEffect(() => {
    dispatch(setOfferAction(id));
    dispatch(setOffersNearbyAction(id));
    dispatch(setOfferReviewsAction(id));
  }, [id, dispatch]);

  if (isOfferLoading) {
    return (
      <LoadingLayout />
    );
  }

  if (!id) {
    return <NotFoundScreen />;
  }

  const { title, price, rating, type, bedrooms, maxAdults, goods, host, description, images, isPremium } = offer as Offer;
  const { name, isPro, avatarUrl } = host;
  const propertyItems = goods.map((good) => <li key={good.toString()} className="property__inside-item">{good}</li>);
  const propertyImages = images.map((image) => (
    <div key={image.toString()} className="property__image-wrapper">
      <img className="property__image" src={image} alt="studio" />
    </div>
  )
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {propertyImages}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                {isPremium && <span>Premium</span>}
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.floor(rating * 100 / 5)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {propertyItems}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  <span className="property__user-status">
                    {isPro && <span>Pro</span>}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList />
                {authStatus === AuthStatus.Auth && <ReviewsForm />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={offersNearbyMap} selectedOffer={offers[0]}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CitiesCardList offers={offersNearby} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
