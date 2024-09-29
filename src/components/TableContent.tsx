import React from "react";
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
  // Handle page change
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
                Name{" "}
                {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort("category")}>
                Category{" "}
                {sortBy === "category" && (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort("description")}>
                Description{" "}
                {sortBy === "description" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </StyledTableHeaderCell>
              <StyledTableHeaderCell onClick={() => handleSort("address")}>
                Address{" "}
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

      <Box mt={2} display="flex" justifyContent="center">
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
