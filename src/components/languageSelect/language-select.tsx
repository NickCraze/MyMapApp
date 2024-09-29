import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LanguageSelectProps {
  language: string;
  handleLanguageChange: (language: string) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  language,
  handleLanguageChange,
}) => {
  const { t } = useTranslation();

  return (
    <Select
      autoWidth={true}
      sx={{ marginLeft: "5px", marginTop: "8px", flex: "start" }}
      size="small"
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
