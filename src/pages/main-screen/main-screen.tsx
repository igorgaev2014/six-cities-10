import CitiesCardList from '../../components/cities-card-list/cities-card-list';
import Logo from '../../components/logo/logo';
import { Offer } from '../../types/offers';
import { CITY_NAMES, SortType } from '../../const';
import Map from '../../components/map/map';
import { useCallback, useMemo, useState } from 'react';
import {useAppSelector} from '../../hooks';
import CityButton from '../../components/city-button/city-button';
import { changeCity } from '../../store/action';
import {useAppDispatch} from '../../hooks';
import SortList from '../../components/sort-list/sort-list';
import Navigation from '../../components/navigation/navigation';

function MainScreen(): JSX.Element {
  const stateCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === stateCity),
    [offers, stateCity]
  );

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const [showSortList, setShowSortList] = useState(false);
  const sort = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  const offersToRender = useMemo(() => {
    switch (sort) {
      case SortType.Rated:
        return filteredOffers.map((item) => item).sort((a, b) => b.rating - a.rating);
      case SortType.PriceHighToLow:
        return filteredOffers.map((item) => item).sort((a, b) => b.price - a.price);
      case SortType.PriceLowToHigh:
        return filteredOffers.map((item) => item).sort((a, b) => a.price - b.price);
      default:
        return filteredOffers;
    }
  }, [sort, filteredOffers]);

  const handleOfferHover = (hoveredOffer: Offer | null) => {
    const currentOffer = filteredOffers.find((offer) => offer.id === hoveredOffer?.id);
    setSelectedOffer(currentOffer);
  };

  const handleChangeCity = (city: string) => {
    dispatch(changeCity({city}));
  };

  const toggleShowSort = useCallback(() => {
    setShowSortList(!showSortList);
  }, [showSortList]);

  const hideSort = useCallback(() => {
    setShowSortList(false);
  }, []);

  return (
    <div className="page page--gray page--main">
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITY_NAMES.map((city) => (
                <CityButton
                  city={city} key={city} isActive={city === stateCity}
                  onChangeCity={handleChangeCity}
                />
              ))}
            </ul>
          </section>
        </div>
        {offersToRender.length !== 0 ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersToRender.length} places to stay in {stateCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by&nbsp;</span>
                  <span
                    className="places__sorting-type"
                    tabIndex={0}
                    onClick={toggleShowSort}
                  >
                    &nbsp;{sort}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  {showSortList ? <SortList onClick={hideSort} /> : null}
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <CitiesCardList offers={offersToRender} onOfferHover={handleOfferHover} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={offersToRender} selectedOffer={selectedOffer} />
                </section>;
              </div>
            </div>
          </div>
        ) : (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in
                    Dusseldorf
                  </p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainScreen;
