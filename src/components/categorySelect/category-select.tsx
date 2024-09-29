import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { styled } from "styled-components";

interface CategorySelectProps {
  category: string;
  setCategory: (category: string) => void;
  categories: string[];
}

const SelectWrapper = styled(Box)`
  margin-top: 20px;
  background-color: white;
  pointer-events: auto;
  border-radius: 10px;
`;

export const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  setCategory,
  categories,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <SelectWrapper>
      <Select
        autoWidth={true}
        size="small"
        labelId="category-select-label"
        value={category}
        onChange={handleChange}
        sx={{ background: " white " }}
        inputProps={{ "aria-label": "Without label" }}
        displayEmpty
      >
        <MenuItem value="">Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category.replace(/_/g, " ").toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};
