// src/components/searchBar/search-bar.tsx
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Search field styling
const SearchField = styled(TextField)`
  background-color: white;
  width: 40%;
  pointer-events: auto;
  top: 10px;
  min-width: 180px !important;
`;

const StyledForm = styled.form`
  display: contents;
`;

interface SearchBarProps {
  searchQuery: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (event: React.FormEvent) => void; // Ensure form submission works
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  handleSearchInputChange,
  handleSearchSubmit,
}) => {
  const { t } = useTranslation();
  return (
    <StyledForm onSubmit={handleSearchSubmit}>
      <SearchField
        label={t("search_places")}
        variant="outlined"
        value={searchQuery}
        size="small"
        onChange={handleSearchInputChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </StyledForm>
  );
};
