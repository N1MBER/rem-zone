import { IconLightningBolt } from '@consta/uikit/IconLightningBolt';
import { IconMoon } from '@consta/uikit/IconMoon';
import { IconSun } from '@consta/uikit/IconSun';
import { IconProps } from '@consta/uikit/__internal__/src/icons/Icon/Icon';
import { ThemeName } from '../../../types/setings';

type ThemeData = {
  label: string;
  icon: React.FC<IconProps>;
};

export const getDataOfTheme = (theme: ThemeName): ThemeData => {
  if (theme === 'Default') {
    return {
      label: 'Светлая',
      icon: IconSun,
    };
  }
  if (theme === 'Dark') {
    return {
      label: 'Темная',
      icon: IconMoon,
    };
  }
  return {
    label: 'Системная',
    icon: IconLightningBolt,
  };
};
