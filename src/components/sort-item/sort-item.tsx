import { useAppDispatch } from '../../hooks';
import { SortType } from '../../const';
import { changeSort } from '../../store/action';

interface SortItemProps {
  sortType: SortType;
  onClick: () => void;
}

function SortItem(props: SortItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleSortItemClick = () => {
    dispatch(changeSort({sort: props.sortType}));
    props.onClick();
  };

  return <div onClick={handleSortItemClick}>{props.sortType}</div>;
}

export default SortItem;
