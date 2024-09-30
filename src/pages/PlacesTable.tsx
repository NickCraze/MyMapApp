import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { fetchPlaceById } from "../services/api";
import { SearchBar } from "../components/searchBar/search-bar";
import { TableContent } from "../components/table-content";
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
  handleSearchSubmit: (searchQuery: string) => void; 
};

export const PlacesTable: React.FC<TableViewProps> = ({
  places,
  handleSearchSubmit,

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
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        <SearchBar handleSearchSubmit={handleSearchSubmit} />
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
