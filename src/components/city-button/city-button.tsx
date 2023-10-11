import {Link} from 'react-router-dom';

type CityButtonProps = {
  city: string;
  isActive: boolean;
  onChangeCity: (city: string) => void;
}

function CityButton(props: CityButtonProps): JSX.Element {
  const { city, isActive, onChangeCity } = props;
  const activeClassName = isActive ? ' tabs__item--active' : '';

  return (
    <li className="locations__item" onClick={() => {onChangeCity(city);}}>
      <Link className={`locations__item-link tabs__item ${activeClassName}`} to="#" >
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default CityButton;
