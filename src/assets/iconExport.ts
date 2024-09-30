import { Icon } from "leaflet";

export const customIcons = {
  foodIcon: new Icon({
    iconUrl: require("./icons/food.png"),
    iconSize: [30, 30],
  }),
  hotelIcon: new Icon({
    iconUrl: require("./icons/hotel.png"),
    iconSize: [30, 30],
  }),
  service_stationIcon: new Icon({
    iconUrl: require("./icons/service_station.png"),
    iconSize: [30, 30],
  }),
  guest_houseIcon: new Icon({
    iconUrl: require("./icons/guest_house.png"),
    iconSize: [30, 30],
  }),
  healthIcon: new Icon({
    iconUrl: require("./icons/health.png"),
    iconSize: [30, 30],
  }),
};

export type CustomIconKeys = keyof typeof customIcons;
