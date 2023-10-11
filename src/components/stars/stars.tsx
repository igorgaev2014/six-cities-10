import {ChangeEvent} from 'react';

type StarsProps = {
  id: number;
  title: string;
  onChangeStar: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function Stars(props: StarsProps): JSX.Element {
  const {id, title, onChangeStar} = props;
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={id + 1} id={`${id + 1}-stars`} type="radio" onChange={onChangeStar}/>
      <label htmlFor={`${id + 1}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default Stars;
