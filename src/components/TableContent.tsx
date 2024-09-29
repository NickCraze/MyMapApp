import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableHeaderCell,
  StyledTableContainer,
  CenteredContainer,
} from "../styles/TableStyles";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./languageSelect/language-select";
import i18n from "../i18n";

interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
}

interface TableContentProps {
  places: Place[];
  onRowClick: (id: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  limit: number;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

export const TableContent: React.FC<TableContentProps> = ({
  places,
  onRowClick,
  page,
  setPage,
  totalItems,
  limit,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  isLoading,
}) => {
  const [language, setLanguage] = useState<string>("en");

  function handleLanguageChange(language: string) {
    i18n.changeLanguage(language);
    setLanguage(language);
  }
  const { t } = useTranslation();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle between ascending and descending
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc"); // Default to ascending order
    }
  };

  if (isLoading) {
    return (
      <CenteredContainer>
        <CircularProgress />
      </CenteredContainer>
    );
  }

  return (
    <>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {/* Header cells with sorting functionality */}
              <StyledTableHeaderCell onClick={() => handleSort("name")}>
                {t("name")}{" "}
                {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort("category")}>
                {t("category")}{" "}
                {sortBy === "category" && (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort("description")}>
                {t("description")}{" "}
                {sortBy === "description" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort("address")}>
                {t("address")}{" "}
                {sortBy === "address" && (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {places.map((place) => (
              <StyledTableRow
                key={place.id}
                onClick={() => onRowClick(place.id)}
              >
                <StyledTableCell>{place.name}</StyledTableCell>
                <StyledTableCell>{place.category}</StyledTableCell>
                <StyledTableCell>{place.description}</StyledTableCell>
                <StyledTableCell>{place.address}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        <LanguageSelect
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
        <Pagination
          count={Math.ceil(totalItems / limit)} // Total number of pages
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};
