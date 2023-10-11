import ReviewsCard from '../../components/reviews-card/reviews-card';
import {useAppSelector} from '../../hooks';

function ReviewsList(): JSX.Element {
  const {reviews} = useAppSelector((state) => state);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewsCard key={review.id} review={review} />)}
      </ul>
    </>
  );
}

export default ReviewsList;
