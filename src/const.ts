export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  Error404 = '*',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  Rated = 'Top rated first',
}

export const URL_MARKER_DEFAULT =
  'img/pin.svg';

export const URL_MARKER_CURRENT =
  'img/pin-active.svg';

export const STAR_RATING = [
  'terribly', 'badly', 'not bad', 'good', 'perfect',
];

export const CITY_NAMES = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg'
];

export enum APIRoute {
  Offers = '/hotels',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June','Jule', 'August', 'September', 'October', 'November', 'December',
];
