import React, { useState } from "react";
import { fetchPlaceById } from "../services/api";
import { SearchBar } from "../components/searchBar/search-bar";
import { TableContent } from "../components/TableContent/table-content";
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
  category: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  limit: number;
  totalItems: number;
  isLoading: boolean;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  handleSearchSubmit: (searchQuery: string) => void;
};

export const PlacesTable: React.FC<TableViewProps> = ({
  places,
  category,
  categories,
  sortBy,
  sortDirection,
  page,
  limit,
  totalItems,
  isLoading,
  handleSearchSubmit,
  setCategory,
  setSortBy,
  setSortDirection,
  setPage,
  setLimit,
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

  return (
    <>
      <SearchWrapper>
        <SearchBar setPage={setPage} handleSearchSubmit={handleSearchSubmit} />
        <CategorySelect
          category={category}
          setCategory={setCategory}
          categories={categories}
          setPage={setPage}
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
