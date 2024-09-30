import React, { useEffect, useState } from "react";
import { ThemeProvider, styled } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { GlobalStyles } from "./styles/globalStyles";
import { Tab, Tabs, Box, Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import PlaceIcon from "@mui/icons-material/Place";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useTranslation } from "react-i18next";
import "./i18n";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchPlaces } from "./services/api";
import { PlacesResponse } from "./types/Places";
import { MapView } from "./pages/MapView";
import { PlacesTable } from "./pages/PlacesTable";

const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 0 20px;
`;

const TabsWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  cursor: pointer !important;
`;

const ToggleButton = styled(Button)`
  display: flex;
  background-color: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.color};
  &:hover {
    background-color: ${({ theme }) => theme.button.hoverBackground};
  }
`;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [limit, setLimit] = useState<number>(10);

  const { t } = useTranslation();

  const {
    data: places,
    refetch,
    isLoading,
  } = useQuery<PlacesResponse, Error>({
    queryKey: ["places", search, category, sortBy, sortDirection, page, limit],
    queryFn: () =>
      fetchPlaces(search, category, sortBy, sortDirection, page, limit),
  });

  useEffect(() => {
    fetchCategories().then((categoriesData) => {
      setCategories(categoriesData);
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [sortBy, sortDirection, search, category, refetch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleSearchSubmit = (searchQuery: string) => {
    setSearch(searchQuery);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Box sx={{ width: "100%" }}>
        <HeaderWrapper>
          <TabsWrapper>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab
                icon={<MapIcon />}
                label={t("maps")}
                aria-label={t("maps")}
                sx={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              <Tab
                icon={<PlaceIcon />}
                label={t("places")}
                aria-label={t("places")}
                sx={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
            </Tabs>
          </TabsWrapper>

          <ToggleButton variant="contained" onClick={toggleTheme}>
            {t(theme === "light" ? "dark_mode" : "light_mode")}
            <LightbulbIcon
              sx={{
                marginLeft: "10px",
                color: theme === "dark" ? "yellow" : "inherit",
              }}
            />
          </ToggleButton>
        </HeaderWrapper>

        <Box mt={2}>
          <div className="App">
            {activeTab === 0 && (
              <MapView
                places={places?.data ?? []}
                category={category}
                setCategory={setCategory}
                categories={categories}
                isLoading={isLoading}
                handleSearchSubmit={handleSearchSubmit}
                setPage={setPage}
              />
            )}
            {activeTab === 1 && (
              <PlacesTable
                places={places?.data ?? []}
                category={category}
                setCategory={setCategory}
                categories={categories}
                setCategories={setCategories}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                isLoading={isLoading}
                handleSearchSubmit={handleSearchSubmit}
                totalItems={places?.meta.totalItems ?? 0}
              />
            )}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
