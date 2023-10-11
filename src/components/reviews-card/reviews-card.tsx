import { Review } from '../../types/reviews';
import {MONTHS} from '../../const';

type ReviewCardProps = {
  review: Review;
}

function ReviewCard({review}: ReviewCardProps): JSX.Element {
  const { comment, user, date, rating } = review;
  const { name, avatarUrl } = user;
  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);

    return `${MONTHS[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${Math.floor(rating * 100 / 5)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date.slice(0, 10)}>{formatDate(date)}</time>
      </div>
    </li>
  );
}

export default ReviewCard;
