import React, { FC, useState } from 'react';
import {
  Theme,
  presetGpnDefault,
  presetGpnDark,
  presetGpnDisplay,
} from '@consta/uikit/Theme';
import { ThemeName } from '../types/theme';
import { ErrorBoundary } from '../common/Layouts/ErrorBoundary/ErrorBoundary';
import { Routes } from '../common/Routes/Routes';
import { Toaster } from '../common/Toaster/Toaster';

export const ThemeContext = React.createContext({
  theme: 'Default',
  setTheme: (_theme: ThemeName) => {
    // eslint-disable-next-line no-console
    console.log(`Change theme to: ${_theme}`);
  },
});

const App: FC = () => {
  const [theme, setTheme] = useState<ThemeName>('Default');

  const getPresetByTheme = () => {
    if (theme === 'Dark') return presetGpnDark;
    if (theme === 'Default') return presetGpnDefault;
    return presetGpnDisplay;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme preset={getPresetByTheme()} className="root">
        <ErrorBoundary>
          <Routes />
          <Toaster />
        </ErrorBoundary>
      </Theme>
    </ThemeContext.Provider>
  );
};

export default App;
