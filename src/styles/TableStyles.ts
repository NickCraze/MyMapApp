import styled from "styled-components";
import { TableCell, TableRow } from "@mui/material";

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const StyledTableContainer = styled.div`
  margin: 30px auto;
  width: 90%;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.table.background};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.table.borderColor};
  overflow-x: auto;
`;

export const StyledTableCell = styled(TableCell)`
  text-align: center !important;
  padding: 10px !important;
  color: ${({ theme }) => theme.table.text} !important;
  border-bottom: 1px solid ${({ theme }) => theme.table.borderColor};
`;

export const StyledTableHeaderCell = styled(StyledTableCell)`
  font-size: 1rem !important;
  font-weight: bold;
  background-color: ${({ theme }) => theme.table.headerBackground} !important;
  color: ${({ theme }) => theme.table.headerText} !important;
  cursor: pointer;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.table.background};
  }
  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.table.background};
  }
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.table.hoverBackground};
    transform: scale(1);
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
`;
