import React, { useState } from "react";
import { MenuItem, Select, Box, SelectChangeEvent } from "@mui/material";
import { fetchPlaceById } from "../services/api";
import { SearchBar } from "../components/searchBar/search-bar";
import { TableContent } from "../components/TableContent";
import { Modal } from "../components/modal/modal";
import { styled } from "styled-components";
import { CategorySelect } from "../components/categorySelect/category-select";
import { Place } from "../types/Places";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type TableViewProps = {
  places: Place[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  isLoading: boolean;
};

export const PlacesTable: React.FC<TableViewProps> = ({
  places,
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  categories,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  page,
  setPage,
  limit,
  setLimit,
  totalItems,
  isLoading,
}) => {
  const [submittedQuery, setSubmittedQuery] = useState<string>(searchQuery);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSubmittedQuery(searchQuery);
  };

  const handleRowClick = async (id: string) => {
    try {
      const placeDetail = await fetchPlaceById(id);
      setSelectedPlace(placeDetail);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch place details.", err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  return (
    <>
      <SearchWrapper>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchSubmit={handleSearchSubmit}
        />
        <CategorySelect
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      </SearchWrapper>

      <TableContent
        setLimit={setLimit}
        places={places}
        onRowClick={handleRowClick}
        page={page}
        setPage={setPage}
        totalItems={totalItems}
        limit={limit}
        isLoading={isLoading}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <Modal
        isOpen={isModalOpen}
        selectedPlace={selectedPlace}
        onClose={handleCloseModal}
      />
    </>
  );
};
