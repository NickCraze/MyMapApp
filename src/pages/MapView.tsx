import React, { useState } from "react";
import styled from "styled-components";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { SearchBar } from "../components/searchBar/search-bar";
import { CategorySelect } from "../components/categorySelect/category-select";
import { Place } from "../types/Places";
import { CustomIconKeys, customIcons } from "../assets/iconExport";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useTheme } from "styled-components";
import { lightTheme } from "../styles/themes";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/languageSelect/language-select";

const MapPlaceholder = styled.div`
  height: 76vh;
  width: 100%;
  background-color: ${({ theme }) => theme.background || "#e0e0e0"};
  border: 3px solid ${({ theme }) => theme.toggleBorder || "#000"};
  color: ${({ theme }) => theme.text || "#000"};
  font-size: 1.2rem;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  z-index: 401;
  position: relative;
  margin-left: 50px;
  pointer-events: none;
`;

type MapViewProps = {
  places: Place[];
  categories: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  handleSearchSubmit: (searchQuery: string) => void;
  setPage: (page: number) => void;
};

export const MapView: React.FC<MapViewProps> = ({
  places,
  categories,
  setCategory,
  category,
  handleSearchSubmit,
  setPage,
  searchQuery,
  setSearchQuery,
}) => {
  const [language, setLanguage] = useState<string>("en");

  const theme = useTheme();

  const { i18n } = useTranslation();

  function handleLanguageChange(language: string) {
    i18n.changeLanguage(language);
    setLanguage(language);
  }

  return (
    <>
      <MapPlaceholder>
        <Wrapper>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
            handleSearchSubmit={handleSearchSubmit}
          />

          <CategorySelect
            setPage={setPage}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </Wrapper>
        <MapContainer
          center={[-33.93, 18.413]}
          zoom={13}
          scrollWheelZoom={true}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
          }}
        >
          {theme === lightTheme ? (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          ) : (
            <TileLayer
              attribution="Stamen darkmode"
              url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
            />
          )}

          {places?.map((place) => {
            const iconKey = `${place.category}Icon` as CustomIconKeys;

            return (
              <MarkerClusterGroup chunkedLoading>
                <Marker
                  key={place.id}
                  position={[place.coordinates.lat, place.coordinates.lon]}
                  icon={customIcons[iconKey]}
                >
                  <Popup>
                    <strong>{place.name}</strong>
                    <br />
                    {place.description}
                  </Popup>
                </Marker>
              </MarkerClusterGroup>
            );
          })}
        </MapContainer>
      </MapPlaceholder>

      <LanguageSelect
        language={language}
        handleLanguageChange={handleLanguageChange}
      />
    </>
  );
};
