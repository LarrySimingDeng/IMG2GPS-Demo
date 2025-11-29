import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -28],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

type Props = {
  lat: number
  lng: number
  title: string
  zoom?: number
}

export function MapView({ lat, lng, title, zoom = 13 }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      attributionControl={false}
      className="map-frame"
      key={`${lat}-${lng}`} // force refresh when coordinates change
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="popup-title">{title}</div>
          <div className="popup-coord">
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
