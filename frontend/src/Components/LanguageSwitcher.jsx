import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'te', label: 'తెలుగు', short: 'TE' },
  { code: 'ta', label: 'தமிழ்', short: 'TA' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'KN' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    window.dispatchEvent(new Event('languageChanged'));
  };

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LanguageIcon sx={{ color: '#000' }} />
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        size="small"
        displayEmpty
        renderValue={() => currentLang.short}
        sx={{
          minWidth: 50,
          borderRadius: 2,
          bgcolor: '#f5f5f5',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          '@media (min-width: 600px)': {
            minWidth: 80,
            fontSize: '0.85rem',
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.short} - {lang.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default LanguageSwitcher;



