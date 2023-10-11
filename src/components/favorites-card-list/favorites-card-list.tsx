import { Offer } from '../../types/offers';
import FavoritesCard from '../../components/favorites-card/favorites-card';

type FavoritesCardListProps = {
  offers: Offer[];
}

function FavoritesCardList({offers}: FavoritesCardListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoritesCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesCardList;
