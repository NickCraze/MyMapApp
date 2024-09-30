import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { lightTheme } from "../../styles/themes";

interface LanguageSelectProps {
  language: string;
  handleLanguageChange: (language: string) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  language,
  handleLanguageChange,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Select
      autoWidth={true}
      sx={{
        background: theme === lightTheme ? "white" : "#77767682",
        margin: "10px",
        flex: "start",
        flexWrap: "wrap",
      }}
      value={language}
      label="Language"
      inputProps={{ "aria-label": "Without label" }}
      displayEmpty
      onChange={(event) => handleLanguageChange(event.target.value as string)}
    >
      <MenuItem value="en">{t("languages.english")} 🇬🇧</MenuItem>
      <MenuItem value="de">{t("languages.german")} 🇩🇪</MenuItem>
      <MenuItem value="fr">{t("languages.french")} 🇫🇷</MenuItem>
    </Select>
  );
};

export default LanguageSelect;
