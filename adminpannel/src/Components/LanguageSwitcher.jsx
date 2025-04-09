import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language'; // Correct import

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'te', label: 'తెలుగు' },
    // Add more languages here
  ];

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center">
      <LanguageIcon />
      <Select value={i18n.language} onChange={handleLanguageChange}>
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;
