import CitiesCard from '../../components/cities-card/cities-card';
import { Offer } from '../../types/offers';

type CitiesCardListProps = {
  offers: Offer[];
  onOfferHover?: (hoveredOffer: Offer | null) => void;
}

function CitiesCardList({offers, onOfferHover}: CitiesCardListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) =>
        <CitiesCard key={offer.id} offer={offer} onOfferHover={onOfferHover} />)}
    </>
  );
}

export default CitiesCardList;
