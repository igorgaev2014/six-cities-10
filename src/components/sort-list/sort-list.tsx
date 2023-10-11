import { useAppSelector } from '../../hooks';
import { SortType } from '../../const';
import SortItem from '../sort-item/sort-item';

type SortListProps = {
  onClick: () => void;
}

function SortList({onClick}: SortListProps): JSX.Element {
  const {sort} = useAppSelector((state) => state);

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {Object.values(SortType).map((sortType) => (
        <li
          key={sortType}
          className={`places__option ${sortType === sort ? 'places__option--active' : ''}`}
          tabIndex={0}
        >
          <SortItem onClick={onClick} sortType={sortType} />
        </li>
      ))}
    </ul>
  );
}

export default SortList;
