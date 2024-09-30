import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  TablePagination,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
  StyledTableHeaderCell,
  StyledTableContainer,
  CenteredContainer,
} from "../../styles/TableStyles";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../languageSelect/language-select";
import i18n from "../../i18n";
import { Place } from "../../types/Places";
import { useTheme } from "styled-components";
import { lightTheme } from "../../styles/themes";

interface TableContentProps {
  places: Place[];
  onRowClick: (id: string) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
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
  setLimit,
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
  const theme = useTheme();

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
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

      <Box
        mt={2}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <LanguageSelect
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
        <TablePagination
          component="div"
          count={totalItems}
          page={page - 1}
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[3, 5, 10, 25, 50]}
          labelRowsPerPage={t("Rows per page")}
          color="primary"
          sx={{
            borderRadius: "5px",
            background: theme === lightTheme ? "white" : "#77767682",
          }}
        />
      </Box>
    </>
  );
};
