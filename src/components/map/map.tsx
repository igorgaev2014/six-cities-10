import {useRef, useEffect} from 'react';
import {Icon, Marker, LayerGroup} from 'leaflet';
import useMap from '../../hooks/useMap';
import {Offer} from '../../types/offers';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer} = props;
  const mapRef = useRef(null);
  const city = offers[0].city;
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const placesLayer = new LayerGroup();
      placesLayer.addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined &&
            offer.location.latitude === selectedOffer?.location.latitude &&
            offer.location.longitude === selectedOffer?.location.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(placesLayer);
      });
      return () => {
        placesLayer.remove();
      };
    }
  }, [map, offers, selectedOffer]);

  useEffect(() => {
    if (map) {
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom, {
        animate: true,
        duration: 0.5
      });
    }
  }, [map, city]);

  return <div ref={mapRef} style={{height: '100%'}}></div>;
}

export default Map;
