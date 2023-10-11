import { ChangeEvent, useState, FormEvent, useCallback } from 'react';
import { STAR_RATING } from '../../const';
import Stars from '../stars/stars';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { useParams } from 'react-router-dom';
import { addReviewAction } from '../../store/api-actions';

function ReviewsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const {reviewPosted} = useAppSelector((state) => state);
  const params = useParams();
  const paramsId = Number(params.id);
  const [formData, setFormData] = useState({rating: '', review: ''});

  const memoChangeHandler = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    setFormData({...formData, rating: value});
  }, [formData]);

  function onTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    const {value} = evt.target;
    setFormData({...formData, review: value});
  }

  function onSubmitHandler(evt: FormEvent) {
    evt.preventDefault();

    dispatch(addReviewAction({
      comment: formData.review,
      rating: Number(formData.rating),
      id: paramsId,
    }));

    setFormData({rating: '', review: ''});
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STAR_RATING.map((star, i) => (
          <Stars id={i} key={star} title={star} onChangeStar={memoChangeHandler}/>
        )).reverse()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onTextAreaChange}
        value={formData.review}
        disabled={reviewPosted}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={reviewPosted}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;

