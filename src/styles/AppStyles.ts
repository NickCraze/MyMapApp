import { styled } from "styled-components";
import { Box, Button } from "@mui/material";

export const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 0 20px;
`;

export const TabsWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  cursor: pointer !important;
`;
export const AppWrapper = styled(Box)`
  height: 100vh;
  min-width:100vw
  margin: 10px;
  padding: 0;
  overflow-y: auto;
  overflow-x: auto;
`;

export const ToggleButton = styled(Button)`
  display: flex;
  background-color: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.color};
  &:hover {
    background-color: ${({ theme }) => theme.button.hoverBackground};
  }
`;
