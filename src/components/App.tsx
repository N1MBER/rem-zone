import React, { FC, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import Cookies from 'js-cookie';
import { logout } from '../store/reducers/user/user';

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

  const dispatch = useDispatch();

  const isAuthorized = useSelector((store: RootState) => store.user.isLogged);

  useEffect(() => {
    if (!Cookies.get('refresh') || Cookies.get('refresh')?.trim() === '') {
      dispatch(logout());
    }
  }, [Cookies.get('access'), Cookies.get('refresh')]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Theme preset={getPresetByTheme()} className="root">
        <ErrorBoundary>
          <Routes authorized={isAuthorized} />
          <Toaster />
        </ErrorBoundary>
      </Theme>
    </ThemeContext.Provider>
  );
};

export default App;
