import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";

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
  handleSearchSubmit: (searchQuery: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearchSubmit(searchQuery);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SearchField
        label={t("search_places")}
        variant="outlined"
        value={searchQuery}
        size="small"
        onChange={(event) => setSearchQuery(event.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                {searchQuery && (
                  <IconButton
                    onClick={() => setSearchQuery("")}
                    aria-label="clear search"
                  >
                    <ClearIcon />
                  </IconButton>
                )}
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
