export const themes = ['Default', 'Dark', 'System'] as const;
export type ThemeName = typeof themes[number];

export type ModalCrudType = 'edit' | 'create' | 'view';
